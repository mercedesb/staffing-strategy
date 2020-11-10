
# Staffing strategy
This is a small React project to make it easy to visualize possible upcoming staffing scenarios and plan for multiple possible futures at once.

## Installing the app
```
yarn install
cd server && yarn install
```

## Contributing

This is a monorepo with a React app in the root and a Node Express server in the `server` directory.

To start the API and client separately for development (to get hot reloads for the React app), you'll want to star them separately in their own terminal sessions.

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
- [forecast-promise](https://www.npmjs.com/package/forecast-promise): Forecast doesn't have a supported API so we're using a small (unsupported) Node package which wraps Forecast and provides a slim API for us to use
- [DayJS](https://day.js.org/): Since Moment is no longer recommended, using an alternative date library
- [React Calendar Timeline](https://github.com/namespace-ee/react-calendar-timeline) - For all the timeline functionality
- [React Date Picker](https://github.com/Hacker0x01/react-datepicker) - For choosing project start and end dates
- [faker.js](https://github.com/marak/Faker.js/) - For mocking data for testing

## TODOs (prioritized)
- [ ] Move all of the airtable and forecast stuff into a Node server
  - [ ] Caching?
  - [ ] error handling
- [ ] Google OAuth
- [ ] tests, obvi
- [ ] update edit forms to be PATCH
- [ ] handle non-contiguous staffing/bench time
- [ ] Put pending hires (with projected start dates) in?
- [ ] Enhancement: indicate if someone is in a lead seat (add to assignment "table")
  
## Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

### Available Scripts

In the project directory, you can run:

#### `yarn start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

#### `yarn test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

#### `yarn build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.