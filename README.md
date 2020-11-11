
# Staffing strategy
This is a small React project to make it easy to visualize possible upcoming staffing scenarios and plan for multiple possible futures at once.

## Installing the app
```
yarn install
cd server && yarn install
```

## Contributing

This is a monorepo with a React app in the root and a Node Express server in the `server` directory.

To start the API and client separately for development (to get hot reloads for the React app), you'll want to start them separately in their own terminal sessions.

Starting the server for development
```
cd server && yarn start
```

Starting the client for development (from the root directory)
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

- [DayJS](https://day.js.org/): Since Moment is no longer recommended, using an alternative date library

### Client dependencies
- [React Calendar Timeline](https://github.com/namespace-ee/react-calendar-timeline) - For all the timeline functionality
- [React Date Picker](https://github.com/Hacker0x01/react-datepicker) - For choosing project start and end dates
- [React Select]() - For easily stylable dropdowns
- [TailwindCSS]() - For utility first CSS
- [postcss-cli]() and [@fullhuman/postcss-purgecss]() - For creating small production CSS files (only packages Tailwind styles actually used)
- [reakit]() - For accessible, composable components
- [tabler-icons]() - For consistent iconography
- [faker.js](https://github.com/marak/Faker.js/) - For mocking data for testing

### Server dependencies
- [forecast-promise](https://www.npmjs.com/package/forecast-promise) - Forecast doesn't have a supported API so we're using a small (unsupported) Node package which wraps Forecast and provides a slim API for us to use
- [axios]() - For making http requests from the Node server
- 

## Helpful examples
- Google OAuth: https://github.com/Shahzayb/mern-google-login
## TODOs (prioritized)
- [ ] Google OAuth
- [ ] JWT
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