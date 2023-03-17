# todo-app

## Launching the app

From the root of the project run:
`docker compose up -d`

This will spin up both the web (react_frontend) and api (nodejs_backend) apps.

## NodeJS

Server launches on port 8080.

Basic CRUD functionality exists via the `/todos` routes:

```
GET /todos
GET /todos/:id
POST /todos
POST /todos/:id
DELETE /todos/:id
```

These are all hooked into a Firestore database that I created for this project.

## React

Frontend app launches on port 8081.