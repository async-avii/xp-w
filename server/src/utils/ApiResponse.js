class ApiResponse {
  constructor(status, code, message = "Success") {
    this.status = status;
    this.code = code;
    this.message = message;
    this.success = status < 400 ? true : false;
  }
}
