class ApiError extends Error {

  constructor(status, message) {
    super()
    this.status = status
    this.message = message
  }

  static unautorizeError(message) {
    return new ApiError(401, message)
  }

  static badRequestError(message) {
    return new ApiError(400, message)
  }

  static forbiddenError(message) {
    return new ApiError(403, message)
  }

  static notFoundError(message) {
    return new ApiError(404, message)
  }

  static internalError(message) {
    return new ApiError(500, message)
  }
}

module.exports = ApiError;