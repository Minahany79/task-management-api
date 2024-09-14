import { ITokenClaim } from "./../models/token-claim";
import jwt, { SignOptions } from "jsonwebtoken";
import path from "path";
import fs from "fs";
import { sanitizedConfig } from "../../../config";

export class JwtService {
  private readonly privateKeyPath!: string;
  private readonly expiry!: number;
  private readonly publicKeyPath!: string;

  constructor() {
    this.privateKeyPath = path.join(sanitizedConfig.TOKEN_KEYS_PATH, sanitizedConfig.TOKEN_PRIVATE_KEY_NAME);
    this.publicKeyPath = path.join(sanitizedConfig.TOKEN_KEYS_PATH, sanitizedConfig.TOKEN_PUBLIC_KEY_NAME);
    this.expiry = sanitizedConfig.TOKEN_EXPIRY_DURATION_IN_SECONDS;
  }

  sign(tokenClaims: ITokenClaim[]): string {
    const privateKey = fs.readFileSync(this.privateKeyPath);
    return jwt.sign(this.getClaimsObject(tokenClaims), privateKey, this.getSignOptions());
  }

  verify(token: string): any {
    const publicKey = fs.readFileSync(this.publicKeyPath);
    return jwt.verify(token, publicKey);
  }

  private getClaimsObject(tokenClaims: ITokenClaim[]) {
    let claims = {};

    for (const claim of tokenClaims) {
      claims = { ...claims, [claim.key]: claim.value };
    }

    return claims;
  }

  private getSignOptions(): SignOptions {
    const signOptions: SignOptions = {
      algorithm: "RS256",
      expiresIn: this.expiry,
    };

    return signOptions;
  }
}
