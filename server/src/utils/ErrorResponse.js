export default class ErrorResponse {
  constructor(status, code, message) {
    this.status = status;
    this.code = code;
    this.message = message;
  }
}
