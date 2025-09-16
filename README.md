# Mobile AR Sketching App

This project is a web application that enables users to create sketches in an augmented reality environment. The core behavior centers around interactively overlaying images on the camera view, allowing users to:

- Move the overlay image by dragging (touch or mouse).
- Scale the image using pinch gestures or mouse wheel.
- Rotate the image via external controls.
- Adjust the image opacity.
- Lock the overlay to prevent further changes.

These features are powered by the [`AROverlay`](src/components/AROverlay.tsx) component, which manages user interactions and image transformations in real time.

The app is built with React, TypeScript, and Vite, and uses Radix UI and Tailwind CSS for its component library and styling.

...

## Features

*   **AR Sketching:** Draw in 3D space using your device's camera.
*   **Photo Import:** Import photos to use as a reference for your sketches.
*   **Control Panel:** Adjust brush size, color, and other settings.
*   **Component Library:** A rich set of UI components built with Radix UI and Tailwind CSS.

## Technologies Used

*   **React:** A JavaScript library for building user interfaces.
*   **TypeScript:** A typed superset of JavaScript that compiles to plain JavaScript.
*   **Vite:** A fast build tool and development server.
*   **Radix UI:** A collection of unstyled, accessible UI components.
*   **Tailwind CSS:** A utility-first CSS framework.
*   **Lucide React:** A library of beautiful and consistent icons.

## Getting Started

### Prerequisites

*   Node.js (v18 or later)
*   npm

### Installation

1.  Clone the repository:
    ```bash
    git clone https://github.com/your-username/holo-sketch-react-app.git
    ```
2.  Navigate to the project directory:
    ```bash
    cd holo-sketch-react-app
    ```
3.  Install the dependencies:
    ```bash
    npm install
    ```

### Running the Development Server

To start the development server, run the following command:

```bash
npm run dev
```

This will start the application in development mode. Open [http://localhost:5173](http://localhost:5173) to view it in the browser.

## Available Scripts

In the project directory, you can run:

*   `npm run dev`: Runs the app in the development mode.
*   `npm run build`: Builds the app for production to the `dist` folder.
*   `npm run lint`: Lints the code using ESLint.
*   `npm run preview`: Serves the production build locally.
*   `npm run deploy`: Deploys the app to GitHub Pages.
*   `npm run deploy-gh`: An alias for `deploy`.

## Attributions

This project uses assets from various sources. Please see the `Attributions.md` file for a complete list of attributions.
  