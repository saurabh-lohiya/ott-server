## Setup Instructions

1. Clone the repository to your local machine.
2. Navigate to the project directory.
3. Install the dependencies by running `npm install`
4. Start the application by running `npm run start`.
5. Start a mongo cluster
6. whitelist all the Ips.


## Endpoints
general overview based on typical RESTful API design:

# User Endpoints

POST /users: Create a new user.
GET /users: Retrieve a list of all users.
GET /users/:username: Retrieve details of a specific user.
PUT /users/:username: Update a specific user.
DELETE /users/:username: Delete a specific user.

# Movie Endpoints

POST /movies: Create a new movie.
GET /movies: Retrieve a list of all movies.
GET /movies/:id: Retrieve details of a specific movie.
PUT /movies/:id: Update a specific movie.
DELETE /movies/:id: Delete a specific movie.
Auth Endpoints
POST /auth/login: Authenticate a user and return a JWT.
POST /auth/register: Register a new user.

# Auth Endpoints
POST /auth/login: Authenticate a user and return a JWT.
POST /auth/register: Register a new user.

## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```