import { TaskStatus } from "../../shared/enums/task-status";
import { IGenericRepository } from "../../shared/repository/abstractions/generic-repository";
import { TasksService } from "./tasks.service";
import { Task } from "./task.entity";
import { CreateTaskDto } from "./dto/create-task.dto";
import { UpdateTaskDto } from "./dto/update-task.dto";
import { User } from "../users/user.entity";

describe("TasksService", () => {
  let tasksService: TasksService;
  let tasksRepository: jest.Mocked<IGenericRepository<Task>>;

  beforeEach(() => {
    tasksRepository = {
      create: jest.fn(),
      find: jest.fn(),
      findOne: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
    } as unknown as jest.Mocked<IGenericRepository<Task>>;

    tasksService = new TasksService();
    (tasksService as any).tasksRepository = tasksRepository;
  });

  it("should create a task", async () => {
    const createTaskDto: CreateTaskDto = {
      title: "Test Task",
      description: "Test Desc",
      user: { id: 1 } as User,
    };
    const newTask = { ...createTaskDto };

    tasksRepository.create.mockResolvedValue(newTask as Task);

    const result = await tasksService.createTask(createTaskDto);

    expect(result).toEqual(newTask);
    expect(tasksRepository.create).toHaveBeenCalledWith(createTaskDto);
  });

  it("should get all tasks for a user", async () => {
    const userId = 1;
    const tasks: Task[] = [{ id: 1, user: { id: userId } } as Task];

    tasksRepository.find.mockResolvedValue(tasks);

    const result = await tasksService.getAllTasks(userId);

    expect(result).toEqual(tasks);
    expect(tasksRepository.find).toHaveBeenCalledWith({ where: { user: { id: userId } } });
  });

  it("should get a task by id for a user", async () => {
    const taskId = 1;
    const userId = 1;
    const task: Task = { id: taskId, user: { id: userId } } as Task;

    tasksRepository.findOne.mockResolvedValue(task);

    const result = await tasksService.getTaskById(taskId, userId);

    expect(result).toEqual(task);
    expect(tasksRepository.findOne).toHaveBeenCalledWith({ where: { id: taskId, user: { id: userId } } });
  });

  it("should update a task", async () => {
    const updateTaskDto: UpdateTaskDto = {
      title: "Updated Task",
      description: "Updated Desc",
    };
    const taskId = 1;
    const userId = 1;

    (tasksRepository.update as jest.Mock).mockResolvedValue({ affected: 1 });

    const result = await tasksService.updateTask(updateTaskDto, taskId, userId);

    expect(result).toEqual({ affected: 1 });

    expect(tasksRepository.update).toHaveBeenCalledWith({ id: taskId, user: { id: userId } }, updateTaskDto);
  });

  it("should delete a task", async () => {
    const taskId = 1;
    const userId = 1;

    (tasksRepository.delete as jest.Mock).mockResolvedValue({ affected: 1 });

    await tasksService.deleteTask(taskId, userId);

    expect(tasksRepository.delete).toHaveBeenCalledWith({ id: taskId, user: { id: userId } });
  });

  it("should update task status", async () => {
    const taskId = 1;
    const userId = 1;
    const task: Task = { id: taskId, user: { id: userId }, status: TaskStatus.Pending } as Task;

    tasksRepository.findOne.mockResolvedValue(task);
    (tasksRepository.update as jest.Mock).mockResolvedValue({ affected: 1 });

    const result = await tasksService.updateTaskStatus(taskId, userId);

    expect(result).toEqual({ affected: 1 });
    expect(tasksRepository.findOne).toHaveBeenCalledWith({ where: { id: taskId, user: { id: userId } } });
    expect(tasksRepository.update).toHaveBeenCalledWith(taskId, { status: TaskStatus.Completed });
  });
});
