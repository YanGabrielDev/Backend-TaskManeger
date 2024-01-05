export class ApiError extends Error {
  statusCode: number = 500
}

export class BadRequestError extends ApiError {
  statusCode = 400
}

export class DataNotFoundError extends ApiError {
  statusCode = 404
}
