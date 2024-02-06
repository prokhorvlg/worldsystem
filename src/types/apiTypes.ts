export enum StatusCode {
  OK = 200,
  Created = 201,

  BadRequest = 400,
  Unauthorized = 401,
  Forbidden = 403,
  NotFound = 404,

  ServerError = 500
}

export enum Method {
  POST = 'POST',
  GET = 'GET'
}
