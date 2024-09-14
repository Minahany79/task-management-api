import { UserRoles } from "../../shared/models/user-roles";
import { ITokenClaim } from "../../shared/models/token-claim";
import { IGenericRepository } from "../../shared/repository/abstractions/generic-repository";
import { GenericRepository } from "../../shared/repository/implementations/generic-repository";
import { HashingService } from "../../shared/services/hashing.service";
import { JwtService } from "../../shared/services/jwt.service";
import { Role } from "../roles/role.entity";
import { UpdateUserDto } from "./dto/update-user.dto";
import { User } from "./user.entity";
import { ErrorResponse } from "../../shared/models/error-response";
import { StatusCodes } from "../../shared/enums/status-codes";
import { UpdatePasswordDto } from "./dto/update-password.dto";
import { CreateUserDto } from "./dto/create-user.dto";
import { LoginDto } from "./dto/login.dto";

export class UsersService {
  private readonly usersRepository: IGenericRepository<User>;
  private readonly jwtService: JwtService;

  constructor() {
    this.usersRepository = new GenericRepository(User);
    this.jwtService = new JwtService();
  }

  getUserById(id: number, relations?: string[]) {
    return this.usersRepository.findOne({ where: { id }, relations });
  }

  getUserByEmail(email: string, relations?: string[]) {
    return this.usersRepository.findOne({ where: { email }, relations });
  }

  deleteUser(id: number) {
    return this.usersRepository.delete(id);
  }

  async login(loginDto: LoginDto) {
    const userInDb = await this.getUserByEmail(loginDto.email.toLowerCase(), ["role"]);
    if (!userInDb) {
      throw new ErrorResponse(`Cannot find user with email: ${loginDto.email}`, StatusCodes.NotFound);
    }
    const isValidPassword = await HashingService.verify(loginDto.password, userInDb.password);

    if (!isValidPassword) {
      throw new ErrorResponse(`Invalid password`, StatusCodes.BadRequest);
    }

    return this.generateToken(userInDb);
  }

  async register(createUserDto: CreateUserDto) {
    const userInDb = await this.getUserByEmail(createUserDto.email.toLowerCase());

    if (userInDb) {
      throw new ErrorResponse("The email already exists in the database", StatusCodes.Conflict);
    }

    const newUser = await this.createUser(createUserDto);
    return this.generateToken(newUser);
  }

  async createUser(createUserDto: CreateUserDto) {
    createUserDto.password = await HashingService.hash(createUserDto.password);

    return this.usersRepository.create(createUserDto as User);
  }

  async updatePassword(updatePasswordDto: UpdatePasswordDto, userId: number) {
    const userInDb = await this.getUserById(userId);

    if (!userInDb) {
      throw new ErrorResponse(`Cannot find the requested user`, StatusCodes.NotFound);
    }

    if (!(await HashingService.verify(updatePasswordDto.oldPassword, userInDb.password))) {
      throw new ErrorResponse(`Invalid password`, StatusCodes.BadRequest);
    }

    const newPassword = await HashingService.hash(updatePasswordDto.newPassword);
    return this.usersRepository.update(userId, { password: newPassword });
  }

  async updateUser(updateUserDto: UpdateUserDto, userId: number) {
    const userInDb = await this.getUserById(userId);

    if (!userInDb) {
      throw new ErrorResponse(`Cannot find the requested user`, StatusCodes.NotFound);
    }

    const isEmailExist = await this.getUserByEmail(updateUserDto.email.toLowerCase());

    if (isEmailExist && isEmailExist.email !== userInDb.email) {
      throw new ErrorResponse(
        `This email: ${updateUserDto.email} already exists in the database`,
        StatusCodes.Conflict,
      );
    }

    return this.usersRepository.update(userId, updateUserDto);
  }

  private generateToken(userInDb: User) {
    return this.provideToken(this.getUserClaims(userInDb));
  }

  private getUserClaims(user: User): ITokenClaim[] {
    return [
      {
        key: "userId",
        value: user.id,
      },
      {
        key: "userEmail",
        value: user.email,
      },
      {
        key: "role",
        value: user.role.name || Object.values(UserRoles).filter((role) => role.id === user.role.id)[0].name,
      },
    ];
  }

  private provideToken(tokenClaims: ITokenClaim[]): string {
    return this.jwtService.sign(tokenClaims);
  }

  addUser(roleId: number): Role {
    const role = new Role();
    role.id = roleId;
    return role;
  }
}
