import { sanitizedConfig } from "../../../config";

export class TokenResponse {
  token: string;
  expiresIn: string;

  constructor(token: string) {
    this.token = token;

    const currentDate = new Date();
    currentDate.setSeconds(sanitizedConfig.TOKEN_EXPIRY_DURATION_IN_SECONDS);

    this.expiresIn = currentDate.toString();
  }
}
