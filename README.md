# Todo

This project was generated using [Angular CLI](https://github.com/angular/angular-cli) version 21.0.5.

## Install

```bash
cd todo
npm install
npm install http-server
```

## Development server

To start a local development server, run:

```bash
ng serve --open
```

## Building

To build the project run:

```bash
ng build
```

This will compile your project and store the build artifacts in the `dist/` directory. By default, the production build optimizes your application for performance and speed.

## Production

```bash
cd dist/todo/browser
npx http-server -p 4200 -c-1
```

## Running unit tests

To execute unit tests with the [Vitest](https://vitest.dev/) test runner, use the following command:

```bash
ng test
```

## Running end-to-end tests

For end-to-end (e2e) testing, run:

```bash
ng e2e
```

Angular CLI does not come with an end-to-end testing framework by default. You can choose one that suits your needs.

## Additional Resources

For more information on using the Angular CLI, including detailed command references, visit the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.
