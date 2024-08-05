const errors = {
  //testing
  errorTest: {
    message: "ERROR Test OK. Check console for the logged results.",
    statusCode: 400,
  },
  fatalTest: {
    message: "FATAL Test OK. Check console for the logged results.",
    statusCode: 500,
  },
  // 400 - bad request - related to the server needs
  err400: {
    message: "Bad request",
    statusCode: 400,
  },
  // cart item
  err400addCartItem: {
    message: "Error adding item to the cart",
    statusCode: 400,
  },
  err400updateCartItem: {
    message: "Error updating cart item",
    statusCode: 400,
  },
  // code
  err400invalidCode: {
    message: "Invalid code. Check your information and try again.",
    statusCode: 400,
  },
  // missing fields
  err400missingFields: {
    message: "Please, complete obligatory information to continue.",
    statusCode: 400,
  },

  // 401 - unauthorized
  err401: { message: "Unauthorized", statusCode: 401 },
  // invalid credentials
  err401invalidCredentials: {
    message: "Invalid credentials. Check your information and try again.",
    statusCode: 401,
  },
  err401userNotVerified: {
    message:
      "Your account has not been verified. Check your email for verification instructions.",
  },
  err401noSession: {
    message: "No session opened. User offline.",
    statusCode: 401,
  },
  err401offline: { message: "Offline", statusCode: 401 },
  // 403 - forbidden
  err403: { message: "Forbidden Action", statusCode: 403 },
  // 404 - not found
  err404: { message: "Not Found", statusCode: 404 },
  err404cart: { message: "Cart is empty" },
  err404itemsCart: {
    message: "There are no items in the cart",
    statusCode: 404,
  },
  err404item: { message: "Item not found", statusCode: 404 },
  err404info: {
    message:
      "Unable to retrieve the necessary information to complete the request",
    statusCode: 404,
  },
  err404product: { message: "Product not found", statusCode: 404 },
  err404user: { message: "User not found", statusCode: 404 },
  // 409 - resource conflict
  err409emailAlreadyTaken: {
    message:
      "This email is already taken. Please use a different one or log in.",
    statusCode: 409,
  },
  // 500 - internal server error - fatal
  err500fatal: { message: "Internal server error. Fatal.", statusCode: 500 },
};

// add all possible errors in app.

export default errors;
