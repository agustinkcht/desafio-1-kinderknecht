# challenges-kinderknecht

Sprint11

WINSTON LOGGER developed for registering requests. Morgan replaced.
- 4 levels(low to hi): HTTP, Info, ERROR, FATAL
- for DEV env, loggers work for console only, at all levels.
- for PROD env, loggers work for console at all levels, and register in file "errors.log" from ERROR and above.

ERROR HANDLING REFORM:
- Custom Error & Error dictionary developed.
- All errors now managed with Custom Error: Controller and Middleware errors pass through the Custom Router and are redirected to Custom Error / Errors in other files not related to routing are passed directly to the Custom Error.
- Custom Error define a statusCode and message, and passes it to the Error Handler. 
- Error handler craftes an appropiate log format and logs it using Winston's logger. At the same time, it sends the response to the client including message and statusCode.

LOGGER TESTING:
with GET request.
- HTTP: api/loggers/ 
- INFO: api/loggers/info
- ERROR: api/loggers/error
- FATAL: api/loggers/fatal

INSTRUCTIONS for running app:
- For dev mode: npm run dev (mongo), npm run fs (file system), npm run memory (memory)
- For prod mode: npm run start
- Admin user (working on all persistencies): bobmoog@gmail.com | s3curep4ss

Use postman for complete access to the resources. Don't forget to log in!