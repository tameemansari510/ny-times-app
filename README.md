# New York Times Most Popular Articles App

This project is a React-based web application designed to display news articles from The New York Times. It utilizes modern technologies such as TypeScript, Material UI, SWR for data fetching, Jest and React Testing Library for unit test and Cypress for end-to-end testing.

## Prerequisites

Ensure you have the following installed on your system:

- [Node.js](https://nodejs.org/) (version 20 or higher)
- [npm](https://www.npmjs.com/) (comes with Node.js) or [yarn](https://yarnpkg.com/)
- [git](https://git-scm.com/downloads) (latest available version)

## Installation

1. Clone the repository:
   ```sh
   git clone https://github.com/tameemansari510/ny-times-app.git
   cd ny-times-app
   ```
2. Install dependencies:
   ```sh
   npm install
   # or
   yarn install
   ```

## Running the Project

To start the development server:

```sh
npm start
# or
yarn start
```

This will run the application on `http://localhost:3000/`.

## Building the Project

To create a production build:

```sh
npm run build
# or
yarn build
```

The production-ready files will be available in the `build/` directory.

## Running Tests

### Unit Tests: 

---
 
> - When running unit test and test coverage command for the first time, press 'a' when prompted, to run all tests.
> - To view the coverage report, navigate to folder coverage -> Icov-report -> index.html.
> - Open index.html in browser for better visual.

---

```sh
npm test
# or
yarn test
```

To check test coverage:

```sh
npm run test:coverage
# or
yarn test:coverage
```

### End-to-End (E2E) Testing with Cypress:

---

> - To view the cypress report, navigate to folder cypress -> reports -> mochawesome.html.
> - Open mochawesome.html in browser for better visual.
> - When running cypress in interactive mode, wait for sometime for the cypress tool to open.
>   - Select "E2E Testing" option in the welcome screen.
>   - In the next screen, Choose a browser of your choice and press "Start E2E Testing"
>   - Select article.cy.ts file from the spec list.


---

To open Cypress in interactive mode:

```sh
npm run cypress:open
# or
yarn cypress:open
```

To run all Cypress tests in headless mode:

```sh
npm run cypress:run
# or
yarn cypress:run
```

To run a specific Cypress test:

```sh
npm run cypress:run-specific
# or
yarn cypress:run-specific
```

To generate Cypress test reports:

```sh
npm run cypress:report
# or
yarn cypress:report
```

## Linting & Formatting

To check for linting errors:

```sh
npm run lint
# or
yarn lint
```

To automatically fix linting errors:

```sh
npm run lint:fix
# or
yarn lint:fix
```

To check code formatting:

```sh
npm run format:check
# or
yarn format:check
```

To format the code:

```sh
npm run format
# or
yarn format
```

## Code Quality Analysis

---

> To run sonarqube in local machine do the following steps (before npm run sonar or yarn sonar):
 -
> - Download [sonarqube](https://www.sonarsource.com/products/sonarqube/downloads/) (community version)
> - A folder will be download in .zip format.
> - Extract the folder.
> - To start sonarqube in command prompt terminal:
>   - For windows: Navigate to bin -> windows-x86-64 -> press StartSonar 
>   - For mac: Navigate to bin -> macosx-universal-64 -> press sonar
>   - For linux: Navigate to bin ->  linux-x86-64 -> press sonar
> - Wait for sometime unil you see "SonarQube is operational" message in the command prompt terminal

---

To analyze code quality using SonarQube:

```sh
npm run sonar
# or
yarn sonar
```

## Project Structure

```
ny-times-app/
├── src/                # Source code
│   ├── components/     # Reusable components
│   ├── pages/          # Page components
│   ├── hooks/          # Custom hooks
│   ├── utils/          # Utility functions
│   ├── assets/         # Static assets (images, icons, etc.)
│   ├── App.tsx         # Root component
│   ├── index.tsx       # Entry point
├── public/             # Public assets
├── cypress/            # Cypress tests
├── package.json        # Project dependencies & scripts
├── README.md           # Project documentation
```

## Browser Support

The project is compatible with the following browsers:

- Chrome (latest version)
- Firefox (latest version)
- Safari (latest version)

## License

This project is licensed under MIT License.

---

Feel free to modify and customize this README as needed!
