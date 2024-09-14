import bcrypt from "bcryptjs";
import { sanitizedConfig } from "../../../config";
export class HashingService {
  public static hash(data: string): Promise<string> {
    return bcrypt.hash(data, sanitizedConfig.SALT_ROUNDS);
  }

  public static verify(data: string, hashValue: string): Promise<boolean> {
    return bcrypt.compare(data, hashValue);
  }
}
