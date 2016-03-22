# hometracktest
code test for hometrack

## Setup

The application relies of several tools some of which depends on Git commands being accessible.

1. Install NodeJS and npm, they come in bundle with each other [Node.js](https://nodejs.org/en/download/)
2. Run the following command in the root directory of this application
```
  npm install
```

Npm will download all server side dependency, this may take a couple of minutes.

3. From the same directory run the following command to start the application
```
  node index.js
```

By default the application will run on port 8080, however when deployed to Heroku, it would run on port 80.

## Library Version

npm: 5.3.5
node: 4.2.2
express: 4.13.1

## Usage

Use a REST client tool such as Postman to access the api endpoint.

On development environment the endpoint should be accessible from the url:
```
POST localhost:8080/.
```

On heroku deployment, the endpoint should be accessible from the url:
```
POST warm-temple-55667.herokuapp.com/
```

Make sure the body of the POST request is of application/json format



