# challenges-kinderknecht

Sprint15

- Stripe payment integration implemented.

-----------------

INSTRUCTIONS for running app:
- For dev mode: npm run dev (mongo), npm run fs (file system), npm run memory (memory)
- For prod mode: npm run start
- Admin user (working on all persistencies): bobmoog@gmail.com | s3curep4ss

Use postman for complete access to the resources. Don't forget to log in!

PAYMENT TESTING:

- valid test card: 
Card Number: 4242 4242 4242 4242
Expiration date: Any future date.
Cvv: any 3-digit number

- invalid cards:
Insufficient funds: 4000 0000 0000 9995
Expired card: 4000 0000 0000 0069
Processing error: 4000 0000 0000 0119
