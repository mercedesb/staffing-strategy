
# Staffing strategy
This is a small React project to make it easy to visualize possible upcoming staffing scenarios and plan for multiple possible futures at once.

## Notable dependencies
- [forecast-promise](https://www.npmjs.com/package/forecast-promise): Forecast doesn't have a supported API so we're using a small (unsupported) Node package which wraps Forecast and provides a slim API for us to use
- [DayJS](https://day.js.org/): Since Moment is no longer recommended, using an alternative date library
- [React Calendar Timeline](https://github.com/namespace-ee/react-calendar-timeline) - For all the timeline functionality

## TODOs
- [x] display scenario timeline correctly
- [x] collapse everything when child is collapsed
- [x] fix modal background
- [x] choose existing project
- [x] edit project (only airtable)
- [ ] autocomplete for person
- [ ] edit person (only airtable)
- [ ] delete project (only airtable, if only one scenario)
- [ ] delete person (only airtable, if only one scenario) 
- [ ] tests, obvi
  
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