import { DB } from "..";
import { Role } from "../../../domains/roles/role.entity";

export const SeedRole = (userRole: string) => {
  const role = new Role();
  role.name = userRole;
  return DB.manager.save(role);
};
