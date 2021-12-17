# Staffing strategy

This is a small React project to make it easy to visualize possible upcoming staffing scenarios and plan for multiple possible futures at once.

It does not have a database (maybe a future enhancement?) and uses Airtable for quick and dirty data storage. This means you'll need to make sure that your Airtable set up has the same tables and coluumns that the code expects.

- [Project setup](#project-setup)
  - [Environment variables](#environment-variables)
    - [Secrets](#secrets)
    - [Getting your Forecast variables](#getting-your-forecast-variables)
    - [Getting your Airtable variables](#getting-your-airtable-variables)
    - [Getting your Google OAuth variables](#getting-your-google-oauth-variables)
    - [Getting your Pipedrive variables](#getting-your-pipedrive-variables)
  - [Running the app for development](#running-the-app-for-development)
- [Deployment](#deployment)
- [Notable dependencies](#notable-dependencies)
  - [Client dependencies](#client-dependencies)
  - [Server dependencies](#server-dependencies)
- [Helpful examples or links that pointed me in the right direction](#helpful-examples-or-links-that-pointed-me-in-the-right-direction)
  - [Auth flow](#auth-flow)
  - [Node](#node)
- [TODOs (prioritized)](#todos-prioritized)

## Project setup

This is a monorepo with a React app in the root and a Node Express server in the `server` directory.

We are using a single `package.json` to manage package dependencies for both applications. React dependences are in `devDependencies` since the React app is built and served by the Express app. Regular `dependencies` are for buildtime and the Node server.

```
nvm use
yarn install
```

### Environment variables

Please check the corresponding `.env.sample` to make sure you have all values defined. Examples can be found in 1Password Tandem General vault. If you need to add env vars for the React app, be sure to prefix with `REACT_APP_`.

#### Secrets

The secret keys kept in your .env variables can be any string you want. The longer you make them, the more secure they are.

#### Getting your Forecast variables

- Your Account ID: https://forecastapp.com/YOUR-ACCOUNT-ID-IS-HERE/schedule/projects
- An [Access Token](http://help.getharvest.com/api-v2/authentication-api/authentication/authentication/): create one [here](https://id.getharvest.com/developers)

To test your Forecast variables, you can run the following `cUrl` request

```
curl -i \
  -H 'Forecast-Account-Id: ACCOUNT-ID'\
  -H 'Authorization: Bearer ACCESS-TOKEN'\
  -H 'User-Agent: https://www.npmjs.com/package/forecast-promise' \
  "https://api.forecastapp.com/whoami"
```

#### Getting your Airtable variables

- [Create an API key](https://airtable.com/account)
- When viewing API documentation for your Base, the id is in the URL: https://airtable.com/YOUR-BASE-ID-IS-HERE/api/docs#curl/introduction

#### Getting your Google OAuth variables

- [Find your Client ID and Secrect](https://console.developers.google.com/apis/credentials/oauthclient/366318533824-3dg77no7d4r2ctb5ekslhcrl9n3hmn8n.apps.googleusercontent.com?project=tandem-staffing-strategy&supportedpurview=project)

#### Getting your Pipedrive variables

- [Find your API key](https://madeintandem.pipedrive.com/settings/api)

### Running the app for development

This project uses `concurrently` to start the server and client at the same time. If either process fails, both will be terminated.

```
yarn start
```

To start the server and the client separately (for finer control and troubleshooting), you can run the following commands in separate terminal windows.

To start the client,

```
yarn start-client
```

To start the server,

```
yarn start-server
```

## Deployment

Currently being deployed to the `tandem-staffing` Heroku application manually.

```
git push heroku main
```

## Notable dependencies

- [DayJS](https://day.js.org/): Since Moment is no longer recommended, using an alternative date library in both the client and server

### Client dependencies

- [React Calendar Timeline](https://github.com/namespace-ee/react-calendar-timeline) - For all the timeline functionality
- [React Date Picker](https://github.com/Hacker0x01/react-datepicker) - For choosing project start and end dates
- [React Select]() - For easily stylable dropdowns
- [TailwindCSS]() - For utility first CSS
- [postcss-cli]() and [@fullhuman/postcss-purgecss]() - For creating small production CSS files (only packages Tailwind styles actually used)
- [reakit]() - For accessible, composable components
- [tabler-icons]() - For consistent iconography
- [faker.js](https://github.com/marak/Faker.js/) - For mocking data for testing
- [react-google-login](https://github.com/anthonyjgrove/react-google-login) - For OAuth from the client

### Server dependencies

- [forecast-promise](https://www.npmjs.com/package/forecast-promise) - Forecast doesn't have a supported API so we're using a small (unsupported) Node package which wraps Forecast and provides a slim API for us to use
- [axios]() - For making http requests from the Node server
- [jsonwebtoken](https://github.com/auth0/node-jsonwebtoken) - For managing JWT in auth flow
- [google-auth-library](https://github.com/googleapis/google-auth-library-nodejs#readme) - For Google OAuth on the server

## Helpful examples or links that pointed me in the right direction

### Auth flow

- [Full flow tutorial](https://stackabuse.com/authentication-and-authorization-with-jwts-in-express-js/)
- [Code Example](https://github.com/Shahzayb/mern-google-login)
- [Silent token refresh example](https://github.com/Sivanesh-S/react-google-authentication/blob/master/src/utils/refreshToken.js)
- [JWT Expiration is in **seconds** not milliseconds](<https://stackoverflow.com/questions/39926104/what-format-is-the-exp-expiration-time-claim-in-a-jwt#:~:text=RFC%207519%20states%20that%20the,(not%20milliseconds)%20since%20Epoch%3A&text=See%20RFC%203339%20%5BRFC3339%5D%20for,general%20and%20UTC%20in%20particular.>)

### Node

- [Debugging Node with Chrome](https://medium.com/the-node-js-collection/debugging-node-js-with-google-chrome-4965b5f910f4)
- [Packaging and serving React from Express](https://simonplend.com/what-is-a-good-directory-structure-for-a-monorepo-with-a-node-js-back-end-and-react-front-end/)
