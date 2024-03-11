## Setup Instructions

1. Clone the repository to your local machine.
2. Navigate to the project directory.
3. Guide to creating a mongo cluster `https://www.mongodb.com/docs/atlas/getting-started/`
4. whitelist all the Ips for the cluster.
5. Create a `.env` file taking reference to `.env.example`
5. Install the dependencies by running `npm install`
6. Start the application by running `npm run start`.


# API Endpoints
general overview based on typical RESTful API design:

## User

POST /users: Create a new user.  
GET /users: Retrieve a list of all users.  
GET /users/:username: Retrieve details of a specific user.  
PUT /users/:username: Update a specific user.  
DELETE /users/:username: Delete a specific user.  

## Movie

POST /movies: Create a new movie.  
GET /movies: Retrieve a list of all movies.  
GET /movies/:id: Retrieve details of a specific movie.  
PUT /movies/:id: Update a specific movie.  
DELETE /movies/:id: Delete a specific movie.  

## Auth

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