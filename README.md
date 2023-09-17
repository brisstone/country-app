# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).


### Country App

## Overview

The "Country App" is a web application that provides information about various countries. It allows users to view and filter countries based on different criteria such as continent and whether a country has states. This documentation provides an overview of the project, its structure, and how to get started.

## Prerequisites

Before you begin, ensure you have met the following requirements:

- Node.js: `>=16.18.1`
- npm: `>=8.19.2`

## Installation

To set up the project locally, follow these steps:

1. Clone the repository to your local machine:

```bash
git clone https://github.com/brisstone/country-app.git
```

2. Change your working directory to the project folder:

```bash
cd country-app
```

3. Install project dependencies using yarn:

```bash
yarn install
```

## Usage

### Development Server

To start the development server and run the app locally, use the following yarn command:

```bash
yarn start
```

The app should now be running at `http://localhost:3000` in your web browser.

### Storybook

This project uses Storybook for component development and documentation. To launch Storybook, use the following yarn command:

```bash
yarn run storybook
```

Storybook will be accessible at `http://localhost:6006` in your web browser.

### Building Storybook

To build the Storybook documentation, you can use the following yarn command:

```bash
yarn run build-storybook
```

The built Storybook documentation will be available in the `storybook-static` directory.

### Tests

This project uses React Testing libraries and Jest, use the following yarn command:

```bash
yarn run test
```


## Folder Structure

The project structure is organized as follows:

- `src`: Contains the source code for the application.
- `src/Components`: Contains React components used in the app.
- `src/stories`: Contains Storybook stories for components.
- `public`: Contains public assets like HTML and images.

## Dependencies

- React: A JavaScript library for building user interfaces.
- Material-UI (MUI): A popular React UI framework.
- Storybook: A tool for building UI component libraries and documenting components.
- TypeScript: A typed superset of JavaScript for better tooling and development experience.


## Author

- OKOLI JOHNSON CHINONSO
- GitHub: [Brisstone](https://github.com/brisstone)



## Available Scripts

In the project directory, you can run:

### `yarn run start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `yarn run test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `yarn run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

