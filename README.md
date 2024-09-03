# challenges-kinderknecht

Challenge4

- Stripe payment integration implemented.
- Premium User role introduced for persistences
- Schemas enhaced and updated
- Documentation enhaced and updated
- Deploy for app

-----------------

INSTRUCTIONS for running app:

- For dev mode: npm run dev (mongo), npm run fs (file system), npm run memory (memory)
- For prod mode: npm run start

USERS:
- Regular User: charlesgardes@gmail.com | s3curep4ss
- Admin User: bobmoog@gmail.com | s3curep4ss
- Premium User: wendycarlos@gmail.com | s3curep4ss
Use postman for complete access to the resources. Don't forget to log in!

AUTHORIZATION KEY FOR OPENAPI DOCUMENTATION:
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6IndlbmR5Y2FybG9zQGdtYWlsLmNvbSIsInJvbGUiOjIsInBob3RvIjoiaHR0cHM6Ly93d3cuaWNvbnBhY2tzLm5ldC9pY29ucy8yL2ZyZWUtdXNlci1pY29uLTMyOTYtdGh1bWIucG5nIiwiX2lkIjoiNjY5MThiNzk0ZDIxYzFiYzBlZmRkNjllIiwib25saW5lIjp0cnVlLCJpYXQiOjE3MjUzMjMyNTIsImV4cCI6MTcyNTQwOTY1Mn0.l3KeoKHyXAok5Aqs2nITPSiPhPm_ByEGP2AAGJqo4lg

PAYMENT TESTING:
- valid test card: 
Card Number: 4242 4242 4242 4242
Expiration date: Any future date.
Cvv: any 3-digit number

- invalid cards:
Insufficient funds: 4000 0000 0000 9995
Expired card: 4000 0000 0000 0069
Processing error: 4000 0000 0000 0119