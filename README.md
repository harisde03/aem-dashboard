# AEM Dashboard

## Live Demo

The web version of this project is deployed at:
[https://harisde03.github.io/aem-dashboard/](https://harisde03.github.io/aem-dashboard/)

## Getting Started

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/harisde03/aem-dashboard.git
   cd aem-dashboard
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

## Web Development

To run the application in your browser for development:

```bash
npm start
```

Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Electron Development

To run the application as a desktop app using Electron:

```bash
npm run electron
```

This will build the Angular app with a relative base href and launch it within an Electron window.

## Building for Production

### Web Build

To build the project for web deployment:

```bash
npm run build
```

The build artifacts will be stored in the `dist/aem-dashboard/` directory.

### Electron App Build

To package the application for desktop (Windows, macOS, or Linux):

```bash
npm run electron:build
```

The packaged executables will be available in the `release/` directory.
