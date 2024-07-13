# challenges-kinderknecht

Sprint10
- Improvements regarding env.
- User data normaliced across dependencies - firstName, lastName, age, verified & verifyCode added as props.
- Mailing with SMTP for verification of users. Verification instance added in register.
- Mock builders with Fakerjs available for mocking users and products.
- 1000 products mocked for dev.
- Compression using Gzip+Brotli
- Error section added in utils, with Error dictionary & CustomError. 

RUNNING APP:
- For dev mode: npm run dev (mongo), npm run fs (file system), npm run memory (memory)
- For prod mode: npm run start
- Admin user (working on all persistencies): bobmoog@gmail.com | s3curep4ss

Use postman for complete access to the resources. Don't forget to log in!