# Holo Sketch React App

**Holo Sketch** is a mobile-friendly web application for overlaying, manipulating, and sketching on top of live camera feeds. Designed for creative AR sketching, it lets users import images, adjust their position and appearance, and draw directly in augmented reality.

## How It Works

- **Live Camera View:** The app opens your device’s camera and displays a real-time video feed.
- **Image Overlay:** Import a photo to overlay on the camera view. The image starts centered and can be moved, scaled, rotated, and its opacity adjusted.
- **Touch & Mouse Controls:** Drag to move, pinch or scroll to scale, and rotate using UI controls. Opacity can be changed with a slider.
- **Responsive UI:** Works on mobile and desktop, with intuitive controls for both.

## Features

- **Import & Manipulate Images:** Center, move, scale, rotate, and adjust opacity of imported images.
- **AR Drawing:** Sketch in real time over the camera feed.
- **Modern UI:** Built with Radix UI, Tailwind CSS, and Lucide icons.

## Technologies

- **React + TypeScript:** Fast, type-safe UI development.
- **Vite:** Lightning-fast dev server and build tool.
- **Radix UI:** Accessible, unstyled UI primitives.
- **Tailwind CSS:** Utility-first styling.
- **Lucide React:** Icon library.

## Getting Started

1. **Install dependencies:**
    ```bash
    npm install
    ```
2. **Start the development server:**
    ```bash
    npm run dev
    ```
3. **Open in browser:**  
   Visit [http://localhost:5173](http://localhost:5173)

## Scripts

- `npm run dev` – Start development server
- `npm run build` – Build for production
- `npm run lint` – Lint code
- `npm run preview` – Preview production build
- `npm run deploy` – Deploy to GitHub Pages

## Attributions

See `Attributions.md` for third-party assets and libraries.

---

**Note:** Camera access is required. For best results, use a modern browser on a mobile device.