export default class ApiResponse {
  constructor(status, code, message = "Success") {
    this.status = status;
    this.code = code;
    this.message = message;
  }
}
