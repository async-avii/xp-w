export function errorHandler(status, code, message) {
  console.error(message);
  return {
    status,
    code,
    message,
  };
}
