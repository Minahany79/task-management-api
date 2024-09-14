import { Role } from "../../domains/roles/role.entity";
import { User } from "../../domains/users/user.entity";

export class UserResponse {
  private readonly name: string;
  private readonly email: string;
  private readonly role: Role;
  private readonly creationDate: Date;

  constructor(user: User) {
    this.name = user.name;
    this.email = user.email;
    this.role = user.role;
    this.creationDate = user.creationDate;
  }
}
