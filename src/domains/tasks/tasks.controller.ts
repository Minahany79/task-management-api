import { Request, Response } from "express";
import { TasksService } from "./tasks.service";
import { ResponseHandlingService } from "../../shared/services/response-handling.service";
import { StatusCodes } from "../../shared/enums/status-codes";
import { IUserToken } from "../../shared/models/user-token";
import { CreateTaskDto } from "./dto/create-task.dto";
import { UpdateTaskDto } from "./dto/update-task.dto";

export class TasksController {
  private readonly tasksService: TasksService;

  constructor() {
    this.tasksService = new TasksService();
  }

  async createTask(req: Request, res: Response) {
    const createTaskDto: CreateTaskDto = {
      ...req.body,
      user: { id: res.locals.user.userId },
    };
    const taskDto = await this.tasksService.createTask(createTaskDto);
    return new ResponseHandlingService(res, taskDto, StatusCodes.Created);
  }

  async getAllTasks(req: Request, res: Response) {
    const user = res.locals.user as IUserToken;
    const tasks = await this.tasksService.getAllTasks(user.userId);
    return new ResponseHandlingService(res, tasks, StatusCodes.OK);
  }

  async getTaskById(req: Request, res: Response) {
    const user = res.locals.user as IUserToken;
    const taskId = parseInt(req.params.id);
    const task = await this.tasksService.getTaskById(taskId, user.userId);
    return new ResponseHandlingService(res, task, StatusCodes.OK);
  }

  async updateTask(req: Request, res: Response) {
    const user = res.locals.user as IUserToken;
    const taskId = parseInt(req.params.id);
    const updateTaskDto: UpdateTaskDto = {
      ...req.body,
    };
    const result = await this.tasksService.updateTask(updateTaskDto, taskId, user.userId);
    return new ResponseHandlingService(res, result, StatusCodes.OK);
  }

  async deleteTask(req: Request, res: Response) {
    const user = res.locals.user as IUserToken;
    const taskId = parseInt(req.params.id);
    const result = await this.tasksService.deleteTask(taskId, user.userId);
    return new ResponseHandlingService(res, result, StatusCodes.OK);
  }

  async markTaskAsCompleted(req: Request, res: Response) {
    const user = res.locals.user as IUserToken;
    const taskId = parseInt(req.params.id);
    const result = await this.tasksService.updateTaskStatus(taskId, user.userId);
    return new ResponseHandlingService(res, result, StatusCodes.OK);
  }
}
