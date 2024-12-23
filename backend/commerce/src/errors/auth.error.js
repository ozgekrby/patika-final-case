import { AppError } from "ok-backend-common/errors/app.error.js";
import {
  MissingAccessTokenError,
  InvalidAccessTokenError,
  AccessDeniedError,
} from "ok-backend-common/errors/auth.error.js";

class AccountExistsError extends AppError {
  constructor(message = "Account already exists!") {
    super(message, 409, "ACCOUNT_EXISTS");
  }
}

class AccountNotFoundError extends AppError {
  constructor(message = "Account not found!") {
    super(message, 404, "ACCOUNT_NOT_FOUND");
  }
}

class InvalidCredentialsError extends AppError {
  constructor(message = "Invalid credentials!") {
    super(message, 401, "INVALID_CREDENTIALS");
  }
}

export {
  AccountExistsError,
  AccountNotFoundError,
  InvalidCredentialsError,
  MissingAccessTokenError,
  InvalidAccessTokenError,
  AccessDeniedError,
};
