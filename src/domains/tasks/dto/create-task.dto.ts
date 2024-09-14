import { User } from "../../users/user.entity";

export interface CreateTaskDto {
  title: string;
  description: string;
  user: User;
}
