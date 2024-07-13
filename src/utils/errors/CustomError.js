class CustomError {
  static new({ message, statusCode }) {
    const error = new Error(message); // JS error constructor.
    error.statusCode = statusCode;
    throw error;
  }
}

export default CustomError;

