export default function asyncHandler(status, code, message) {
  return {
    status: status,
    code: code,
    message: message,
  };
}
