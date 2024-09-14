import { Request, Response } from "express";
import { UsersService } from "./users.service";
import { ResponseHandlingService } from "../../shared/services/response-handling.service";
import { StatusCodes } from "../../shared/enums/status-codes";
import { TokenResponse } from "../../shared/models/token-response";
import { UpdateUserDto } from "./dto/update-user.dto";
import { MessageResponse } from "../../shared/models/message-response";
import { IUserToken } from "../../shared/models/user-token";
import { UserResponse } from "../../shared/models/user-response";
import { UserRoles } from "../../shared/models/user-roles";
import { UpdatePasswordDto } from "./dto/update-password.dto";
import { CreateUserDto } from "./dto/create-user.dto";
import { LoginDto } from "./dto/login.dto";

export class UsersController {
  private readonly usersService: UsersService;

  constructor() {
    this.usersService = new UsersService();
  }

  async getCurrentUser(req: Request, res: Response) {
    const user = res.locals.user as IUserToken;
    const userInDb = await this.usersService.getUserById(user.userId, ["role"]);
    return new ResponseHandlingService(res, new UserResponse(userInDb), StatusCodes.OK);
  }

  async deleteUser(req: Request, res: Response) {
    const user = res.locals.user as IUserToken;
    return new ResponseHandlingService(res, await this.usersService.deleteUser(user.userId), StatusCodes.OK);
  }

  async login(req: Request, res: Response) {
    const loginDto: LoginDto = {
      ...req.body,
    };
    const token = await this.usersService.login(loginDto);

    return new ResponseHandlingService(res, new TokenResponse(token), StatusCodes.OK);
  }

  async register(req: Request, res: Response) {
    const createUserDto: CreateUserDto = {
      ...req.body,
      role: this.usersService.addUser(UserRoles.User.id),
    };

    const token = await this.usersService.register(createUserDto);
    return new ResponseHandlingService(res, new TokenResponse(token), StatusCodes.OK);
  }

  async updateCurrentUser(req: Request, res: Response) {
    const user = res.locals.user as IUserToken;
    const updateUserDto: UpdateUserDto = {
      ...req.body,
    };

    const result = await this.usersService.updateUser(updateUserDto, user.userId);

    return new ResponseHandlingService(res, result, StatusCodes.OK);
  }

  async changePassword(req: Request, res: Response) {
    const user = res.locals.user as IUserToken;
    const updatePasswordDto: UpdatePasswordDto = {
      ...req.body,
    };

    await this.usersService.updatePassword(updatePasswordDto, user.userId);

    return new ResponseHandlingService(res, new MessageResponse("Password changed successfully"), StatusCodes.OK);
  }
}
