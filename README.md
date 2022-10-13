# Rick and Morty Server

This project was developed with [Node](https://nodejs.org/es/), [Express](https://expressjs.com/es/), [Typescript](https://www.typescriptlang.org/), [Axios](https://axios-http.com/), [MongoDB](https://www.mongodb.com/), [Mongodb Atlas](https://www.mongodb.com/es/cloud/atlas) and [Jest](https://jestjs.io/es-ES/).

## Initialization Scripts

The first command to run is `npm i` to install dependencies.
You can see all the dependencies and scripts in `package.json` file.

Then, to start the project, run `npm run dev`.
The project will open in [http://localhost:8000](http://localhost:8000) to check it in the browser.

For testing you can run `npm run test`. Jest will run the test and show the results in the console.

**Note: you will need to run `RickAndMortyClient` to interact with the project**

## Project Walkthrough

The project is made up of a main server.ts file. There we use `Node` and `Express` to set up the server.

This one connects with our database by `MongoDB` which is connected to `Mongodb Atlas`.

Through the project, we type everything with `Typescript`, creating types and interfaces to prevent errors.

It is made up of routes and controllers to make several queries with `Axios`. These controllers work with models, which are then sent to the database.

The project use a middleware to check authentication to prevent hacking. Also, you can see the Rick and Morty endpoints in the services section.

We use a utils section to store our common functions and finally tested with `Jest` to check new changes.
