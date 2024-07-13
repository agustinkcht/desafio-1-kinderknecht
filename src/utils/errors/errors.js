const errors = {
    // 400
    error : { message: "Error", statusCode: 400 },
    // invalid credentials
    invalidCredentials : { message: "Invalid credentials. Please check your information and try again.", statusCode: 400 },
    // missing credentials
    missingCredentialsMailPass : { message: "Please provide both an email address and a password.", statusCode: 400 },
    missingCredentialsNames : { message: "Please provide both a fist name and last name.", statusCode: 400 },
    missingCredentialsAge : { message: "Please provide your age", statusCode: 400 },
    // 401 - bad auth
    badAuth : { message: "Bad Auth", statusCode: 401 },
    userNotVerified : { message: "Your account has not been verified. Please check your email for verification instructions." },
    forbidden : { message: "Forbidden Action", statusCode: 403 },
    notFound : { message: "Not Found", statusCode: 404 },
    emailAlreadyTaken : { message: "This email is already taken. Please use a different one or log in.", statusCode: 409 },
    // 500
    fatal : { message: "Fatal", statusCode: 500 }
}

// add all possible errors in app.

export default errors;