import { HTTP_STATUS } from '../constants/http-status.constant.js';

export class HttpError extends Error {
  constructor(message = 'HTTP Error', status = HTTP_STATUS.INTERNAL_SERVER_ERROR) {
    super(message);
    this.name = this.constructor.name;
    this.status = status;
    Error.captureStackTrace(this, this.constructor);
  }
}

export class BadRequest extends HttpError {
  constructor(message = 'Bad Request') {
    super(message, HTTP_STATUS.BAD_REQUEST);
  }
}

export class Unauthorized extends HttpError {
  constructor(message = 'Unauthorized') {
    super(message, HTTP_STATUS.UNAUTHORIZED);
  }
}

export class Forbidden extends HttpError {
  constructor(message = 'Forbidden') {
    super(message, HTTP_STATUS.FORBIDDEN);
  }
}

export class NotFound extends HttpError {
  constructor(message = 'Not Found') {
    super(message, HTTP_STATUS.NOT_FOUND);
  }
}

export class Conflict extends HttpError {
  constructor(message = 'Conflict') {
    super(message, HTTP_STATUS.CONFLICT);
  }
}

export class InternalServerError extends HttpError {
  constructor(message = 'Internal Server Error') {
    super(message, HTTP_STATUS.INTERNAL_SERVER_ERROR);
  }
}
