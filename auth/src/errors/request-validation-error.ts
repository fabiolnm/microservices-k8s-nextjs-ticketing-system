import { ValidationError } from "express-validator"
import { CustomError } from "./custom-error"

export class RequestValidationError extends CustomError {
  statusCode = 400

  constructor(private errors: ValidationError[]) {
    super('Validation error')

    // Only because we are extending a built in class
    Object.setPrototypeOf(this, RequestValidationError.prototype)
  }

  serializeErrors() {
    return this.errors.map(e => (
      e.type === 'field'
        ? { message: e.msg, field: e.path }
        : { message: e.msg }
    ))
  }
}