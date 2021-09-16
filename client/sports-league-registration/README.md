<!-- Getting started -->

# Technologies used

1. node to run server and to use npm to install dependencies required
2. angular-cli to start the application and to scaffold build components
3. JavaScript for server
4. Angular - Typescript for Client
5. github - push updated code and version control

If you do not have angular-cli you can download them globally using on of the following:

- npm install -g @angular/cli
- npm i -g @angular/cli

# Downloading/Cloning Repo

If you have already successfully clone this repo to the directory of your choice you may skip ahead to setting up the server:

to clone the project locally. make sure you have the ability to run git based on the technologies above.

run the following command to clone the project to that directory:

- https://github.com/AnthonyLG7/capstone-project.git

It will be useful to have two terminal windows if you would like to see the server responses.

<!-- Setting up the Server-->

# Setting up Server

Once the project is successfully cloned you will need to change directories using:

- cd capstone-project

If you are not in the directory that you cloned the project to first change to the appropriate directory and run the command above.

In order to ensure the server is ready for use. change directories to the server folder.

- cd server

You will need to run npm i to ensure you get all the needed node_modules, that contain any dependencies you will need.

- npm install
- npm i

Once the node_modules have been downloaded, you can start the server using:

- node server.js

server.js contains all of the restful logic for the Backend of our application.

<!-- Setting up the Client -->

# Setting up Clinet

After the server is up and running. change back to the capstone-project directory and change into the client folder

- cd client

You will need to run npm i to ensure you get all the needed node_modules, that contain any dependencies you will need.

- npm install
- npm i

Once the node_modules have been downloaded, you can start the client using:

- ng serve

The application is now ready to be used.

<!-- About the application -->

This application is to be used to browse through any sports, teams, coaches, and players available. It will allow you to add yourself to an available team for an available sport. If one does not exist, you also have the ability to create a sport, add a team, and add a player to the given team.

<!-- Angular client assistance -->

# SportsLeagueRegistration

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 9.0.1.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).
