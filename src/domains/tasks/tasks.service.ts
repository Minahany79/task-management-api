import { TaskStatus } from "../../shared/enums/task-status";
import { IGenericRepository } from "../../shared/repository/abstractions/generic-repository";
import { GenericRepository } from "../../shared/repository/implementations/generic-repository";
import { CreateTaskDto } from "./dto/create-task.dto";
import { UpdateTaskDto } from "./dto/update-task.dto";
import { Task } from "./task.entity";

export class TasksService {
  private readonly tasksRepository: IGenericRepository<Task>;

  constructor() {
    this.tasksRepository = new GenericRepository(Task);
  }

  createTask(createTaskDto: CreateTaskDto): Promise<Task> {
    return this.tasksRepository.create(createTaskDto as Task);
  }

  getAllTasks(userId: number): Promise<Task[]> {
    return this.tasksRepository.find({ where: { user: { id: userId } } });
  }

  getTaskById(taskId: number, userId: number) {
    return this.tasksRepository.findOne({ where: { id: taskId, user: { id: userId } } });
  }

  updateTask(updateTaskDto: UpdateTaskDto, taskId: number, userId: number) {
    return this.tasksRepository.update({ id: taskId, user: { id: userId } }, updateTaskDto);
  }

  deleteTask(taskId: number, userId: number) {
    return this.tasksRepository.delete({ id: taskId, user: { id: userId } });
  }

  async updateTaskStatus(taskId: number, userId: number) {
    const task = await this.tasksRepository.findOne({ where: { id: taskId, user: { id: userId } } });
    if (!task) {
      throw new Error(`Task with ID ${taskId} not found`);
    }
    return this.tasksRepository.update(taskId, { status: TaskStatus.Completed });
  }
}
