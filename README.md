# todo-app

Welcome to the TODO app I created

- [x] Create a write-up that will guide us through your application and the organization of the code base.

I separated the frontend from the backend and set up a Dockerfile inside each. At the root level is the docker-compose.yml which will allow us to launch the app.

## Launching the app

From the root of the project run:
`docker compose up -d`

This will spin up both the web (react_frontend) and api (nodejs_backend) apps. The Firestore database was created solely for this project and is being accessed via a client in the api. Lastly, I added Tailwind CSS for simplicity to get it to have a some level of look or feel.

- [x] This app should use React for the front end and Node.js and express for the backend.
- [x] The app should be connected to a Firestore database for storage.

- [x] The web page/pages are well organized and have a consistent look and feel

- [x] This application should be built from scratch (plenty of googling is expected)

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

POST /todos will allow you to create a new TODO
Example payload:
```
{
    "text": "create_test_3",
    "completed": false
}
```

POST /todos/:id will allow you to update a TODO
#### Note:
Currently toggles completed but frontend solution is missing for any additional fields.

These are all hooked into a Firestore database that I created for this project.

## React

Frontend app launches on port 8081.

Once project is running, navigate to `localhost:8081`

Landing page contains a list of TODO items, an input, and a submit button.

- [x] A user should be able to see a list of TODO items

Input accepts a todo title and on enter or submit, added to the list.

- [x] A user should be able to add a TODO item to the main list

If the garbage can icon is clicked, the item is removed from the list.

- [x] A user should be able to delete a TODO item

If a todo item is clicked, it will trigger an update to mark it completed
    
- [x] A user should be able to update a TODO item
- [x] A User should be able to mark a TODO item as completed