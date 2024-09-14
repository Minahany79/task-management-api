import { check } from "express-validator";
import { RequestValidator } from "../../shared/middlewares/request-validator";

export class UsersValidator {
  static loginUser() {
    return [
      check("email").notEmpty().withMessage("The email is required").isEmail().withMessage("Invalid email format"),
      check("password").notEmpty().withMessage("The password is required"),
      RequestValidator.validateWithRules,
    ];
  }

  static registerUser() {
    return [
      check("name").isLength({ min: 3, max: 50 }).withMessage("The name must be between 3 and 50 characters"),
      check("email").notEmpty().withMessage("The email is required").isEmail().withMessage("Invalid email format"),
      check("password")
        .notEmpty()
        .withMessage("The password is required")
        .isStrongPassword({ minLength: 8, minLowercase: 1, minUppercase: 1, minSymbols: 1, minNumbers: 1 })
        .withMessage(
          "The password must include at least one lowercase letter, one uppercase letter, one digit, one special character, and be at least 8 characters long.",
        ),
      RequestValidator.validateWithRules,
    ];
  }

  static updateUser() {
    return [
      check("name").isLength({ min: 3, max: 50 }).withMessage("The name must be between 3 and 50 characters"),
      check("email").isEmail().withMessage("Invalid email format"),
      RequestValidator.validateWithRules,
    ];
  }

  static changePassword() {
    return [
      check("oldPassword").notEmpty().withMessage("The old password is required"),
      check("newPassword")
        .notEmpty()
        .withMessage("The new password is required")
        .isStrongPassword({ minLength: 8, minLowercase: 1, minUppercase: 1, minSymbols: 1, minNumbers: 1 })
        .withMessage(
          "The new password must include at least one lowercase letter, one uppercase letter, one digit, one special character, and be at least 8 characters long.",
        ),
      RequestValidator.validateWithRules,
    ];
  }
}
