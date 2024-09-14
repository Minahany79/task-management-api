import { Role } from "../../roles/role.entity";

export interface CreateUserDto {
  name: string;
  email: string;
  password: string;
  role: Role;
}
