class AppError extends Error {
  constructor(message, status, errorCode) {
    super(message);
    this.status = status;
    this.errorCode = errorCode;
  }
}

class RequestValidationError extends AppError {
  constructor(message = 'Required parameter is missing or invalid!', fields) {
    super(message, 400, 'INVALID_REQUEST');
    this.fields = fields;
  }
}

class NotFoundError extends AppError {
  constructor(message = 'Not found!') {
    super(message, 404, 'NOT_FOUND');
  }
}

export {
  AppError,
  RequestValidationError,
  NotFoundError,
};