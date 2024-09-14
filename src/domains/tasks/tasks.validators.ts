import { check } from "express-validator";
import { RequestValidator } from "../../shared/middlewares/request-validator";

export class TasksValidator {
  static createTask() {
    return [
      check("title").notEmpty().withMessage("The title is required"),
      check("description").notEmpty().withMessage("The description is required"),
      RequestValidator.validateWithRules,
    ];
  }

  static getTaskById() {
    return [check("id").isInt().withMessage("ID must be an integer"), RequestValidator.validateWithRules];
  }

  static updateTask() {
    return [
      check("id").isInt().withMessage("ID must be an integer"),
      check("title").notEmpty().withMessage("The title is required"),
      check("description").notEmpty().withMessage("The description is required"),
      RequestValidator.validateWithRules,
    ];
  }

  static deleteTask() {
    return [check("id").isInt().withMessage("ID must be an integer"), RequestValidator.validateWithRules];
  }

  static updateTaskStatus() {
    return [check("id").isInt().withMessage("ID must be an integer"), RequestValidator.validateWithRules];
  }
}
