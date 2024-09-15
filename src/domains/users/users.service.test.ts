import { UsersService } from "./users.service";
import { User } from "./user.entity";
import { CreateUserDto } from "./dto/create-user.dto";
import { LoginDto } from "./dto/login.dto";
import { ErrorResponse } from "../../shared/models/error-response";
import { StatusCodes } from "../../shared/enums/status-codes";
import { HashingService } from "../../shared/services/hashing.service";
import { JwtService } from "../../shared/services/jwt.service";
import { IGenericRepository } from "../../shared/repository/abstractions/generic-repository";
import { Role } from "../roles/role.entity";

jest.mock("../../shared/services/hashing.service");
jest.mock("../../shared/services/jwt.service");
jest.mock("../../shared/repository/implementations/generic-repository");

describe("UsersService", () => {
  let usersService: UsersService;
  let usersRepository: jest.Mocked<IGenericRepository<User>>;
  let jwtService: jest.Mocked<JwtService>;

  beforeEach(() => {
    usersRepository = {
      create: jest.fn(),
      find: jest.fn(),
      findOne: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
    } as unknown as jest.Mocked<IGenericRepository<User>>;
    jwtService = new JwtService() as jest.Mocked<JwtService>;

    usersService = new UsersService();
    (usersService as any).usersRepository = usersRepository;
    (usersService as any).jwtService = jwtService;
  });

  it("should login a user with valid credentials", async () => {
    const loginDto: LoginDto = { email: "test@example.com", password: "password123" };
    const user: User = {
      id: 1,
      email: "test@example.com",
      password: "hashedpassword",
      role: { id: 1, name: "User" },
    } as User;

    (usersRepository.findOne as jest.Mock).mockResolvedValue(user);
    (HashingService.verify as jest.Mock).mockResolvedValue(true);
    (usersService as any).generateToken = jest.fn().mockReturnValue("token");

    const result = await usersService.login(loginDto);

    expect(result).toBe("token");
    expect(usersRepository.findOne).toHaveBeenCalledWith({ where: { email: "test@example.com" }, relations: ["role"] });
    expect(HashingService.verify).toHaveBeenCalledWith("password123", "hashedpassword");
  });

  it("should throw error if login credentials are invalid", async () => {
    const loginDto: LoginDto = { email: "test@example.com", password: "wrongpassword" };
    const user: User = {
      id: 1,
      email: "test@example.com",
      password: "hashedpassword",
      role: { id: 1, name: "User" },
    } as User;

    (usersRepository.findOne as jest.Mock).mockResolvedValue(user);
    (HashingService.verify as jest.Mock).mockResolvedValue(false);

    await expect(usersService.login(loginDto)).rejects.toThrow(
      new ErrorResponse("Invalid password", StatusCodes.BadRequest),
    );
  });

  it("should register a new user and return a token", async () => {
    const createUserDto: CreateUserDto = {
      name: "New User",
      email: "newuser@example.com",
      password: "newpassword",
      role: { id: 1, name: "User" } as Role,
    };
    const newUser: User = {
      id: 1,
      email: "newuser@example.com",
      password: "hashedpassword",
      role: { id: 1, name: "User" },
    } as User;

    (usersRepository.findOne as jest.Mock).mockResolvedValue(null); // No user found
    (usersRepository.create as jest.Mock).mockResolvedValue(newUser);
    (HashingService.hash as jest.Mock).mockResolvedValue("hashedpassword");
    (usersService as any).generateToken = jest.fn().mockReturnValue("token");

    const result = await usersService.register(createUserDto);

    expect(result).toBe("token");
    expect(usersRepository.findOne).toHaveBeenCalledWith({ where: { email: "newuser@example.com" } });
    expect(usersRepository.create).toHaveBeenCalledWith({ ...createUserDto, password: "hashedpassword" } as User);
  });

  it("should throw error if email already exists during registration", async () => {
    const createUserDto: CreateUserDto = {
      name: "Existing User",
      email: "existinguser@example.com",
      password: "password123",
    };
    const existingUser: User = { id: 1, email: "existinguser@example.com", password: "hashedpassword" } as User;

    (usersRepository.findOne as jest.Mock).mockResolvedValue(existingUser);

    await expect(usersService.register(createUserDto)).rejects.toThrow(
      new ErrorResponse("The email already exists in the database", StatusCodes.Conflict),
    );
  });
});
