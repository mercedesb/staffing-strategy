
# Staffing strategy
This is a small React project to make it easy to visualize possible upcoming staffing scenarios and plan for multiple possible futures at once.

## Project setup
```
yarn install
cd server && yarn install
```

## Contributing

This is a monorepo with a React app in the root and a Node Express server in the `server` directory.

To start the API and client separately for development (to get hot reloads for the React app), you'll want to start them separately in their own terminal sessions.

### Starting the server for development
```
cd server && yarn start
```

### Starting the client for development (from the root directory)
```
yarn start-client
```

Make sure that you have set the `REACT_APP_SERVER_API_URL` to point to your development server.


## Running the app

To run the app (not in development mode).

```
yarn start
```

Note: this will hot reload the server if you make changes but will not hot reload the React client since it builds the React client and serves the static files.

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
- Full flow tutorial: https://stackabuse.com/authentication-and-authorization-with-jwts-in-express-js/
- Google OAuth Example: https://github.com/Shahzayb/mern-google-login
- JWT Expiration: https://stackoverflow.com/questions/39926104/what-format-is-the-exp-expiration-time-claim-in-a-jwt#:~:text=RFC%207519%20states%20that%20the,(not%20milliseconds)%20since%20Epoch%3A&text=See%20RFC%203339%20%5BRFC3339%5D%20for,general%20and%20UTC%20in%20particular.
- Silent token refresh: https://github.com/Sivanesh-S/react-google-authentication/blob/master/src/utils/refreshToken.js

### Debugging Node
- https://medium.com/the-node-js-collection/debugging-node-js-with-google-chrome-4965b5f910f4

### REST Api in Express
- https://stackabuse.com/building-a-rest-api-with-node-and-express/


## TODOs (prioritized)
- [ ] JWT Security enhancement
  - [ ] HttpOnly cookie for refreshToken
- [ ] skip auth in development (env var)
- [ ] error handling
- [ ] Caching on the node server?
- [ ] set up concurrently for development
- [ ] reorganize code on server so that the controllers make sense
- [ ] tests, obvi
- [ ] forecast token
- [ ] update edit forms to be PATCH
- [ ] handle non-contiguous staffing/bench time
- [ ] Put pending hires (with projected start dates) in?
- [ ] Enhancement: indicate if someone is in a lead seat (add to assignment "table")
- [ ] Enhancement: admin functionality to invite users