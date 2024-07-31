# challenges-kinderknecht

Sprint11

|| server clusterization - docker - kubernetes & minikube - password reset ||

-----------------

SERVER now in cluster format. Available with 8 worker processes.

DOCKERFILE configured. Available to create an image and container.

KUBERNETES & MINIKUBE:
- Installation done.
- YAML manifest created.
- Orchestration available for creating pods, service & deployment. 

PASSWORD RESET:
- "Forgot password?" added in login.
- View created for password reset form.
- POST /api/sessions/password sends email with verification code.
- PUT /api/sessions/password checks the verification code and updates the password.

-----------------

INSTRUCTIONS for running app:
- For dev mode: npm run dev (mongo), npm run fs (file system), npm run memory (memory)
- For prod mode: npm run start
- Admin user (working on all persistencies): bobmoog@gmail.com | s3curep4ss

Use postman for complete access to the resources. Don't forget to log in!