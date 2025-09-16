import { useState, useRef } from 'react';
import { CameraView } from './components/CameraView';
import { AROverlay } from './components/AROverlay';
import { ControlPanel } from './components/ControlPanel';
import { AppHeader } from './components/AppHeader';

export default function App() {
  const [selectedImage, setSelectedImage] = useState<string>('');
  const [opacity, setOpacity] = useState(50);
  const [isLocked, setIsLocked] = useState(false);
  const [cameraStream, setCameraStream] = useState<MediaStream | null>(null);
  const [isFlashlightOn, setIsFlashlightOn] = useState(false);
  const overlayRef = useRef<HTMLDivElement>(null);

  const handleImageSelect = (imageUrl: string) => {
    setSelectedImage(imageUrl);
    setOpacity(50);
    setIsLocked(false);
  };

  const handleCameraReady = (stream: MediaStream | null) => {
    setCameraStream(stream);
  };

  const handleRotateLeft = () => {
    const overlay = overlayRef.current as any;
    if (overlay?.rotate) {
      overlay.rotate(-15);
    }
  };

  const handleRotateRight = () => {
    const overlay = overlayRef.current as any;
    if (overlay?.rotate) {
      overlay.rotate(15);
    }
  };

  const handleReset = () => {
    const overlay = overlayRef.current as any;
    if (overlay?.resetTransform) {
      overlay.resetTransform();
    }
  };

  const handleZoomIn = () => {
    const overlay = overlayRef.current as any;
    if (overlay?.setScale) {
      overlay.setScale(1.2);
    }
  };

  const handleZoomOut = () => {
    const overlay = overlayRef.current as any;
    if (overlay?.setScale) {
      overlay.setScale(0.8);
    }
  };

  const handleFlashlightToggle = async () => {
    if (!cameraStream) return;

    const track = cameraStream.getVideoTracks()[0];
    const capabilities = track.getCapabilities?.();
    
    if (capabilities?.torch) {
      try {
        await track.applyConstraints({
          advanced: [{ torch: !isFlashlightOn } as any]
        });
        setIsFlashlightOn(!isFlashlightOn);
      } catch (error) {
        console.error('Flashlight not supported:', error);
      }
    }
  };

  const hasFlashlight = () => {
    if (!cameraStream) return false;
    const track = cameraStream.getVideoTracks()[0];
    const capabilities = track.getCapabilities?.();
    return capabilities?.torch === true;
  };

  return (
    <div className="h-screen flex flex-col bg-black text-white overflow-hidden">
      <AppHeader 
        onImageSelect={handleImageSelect}
      />
      
      <div className="flex-1 relative">
        <CameraView onCameraReady={handleCameraReady} />
        
        {selectedImage && (
          <div className="absolute inset-0">
            <AROverlay
              ref={overlayRef}
              imageUrl={selectedImage}
              opacity={opacity}
              isLocked={isLocked}
            />
          </div>
        )}
        
        {!selectedImage && (
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="bg-black/60 backdrop-blur-sm rounded-2xl p-6 text-center max-w-sm mx-4">
              <h3 className="mb-2">Welcome to HoloSketch</h3>
              <p className="text-white/80">
                {cameraStream 
                  ? "Import a photo to start tracing with AR overlay. Perfect for sketching and drawing practice."
                  : "Import a photo to start tracing. The image will overlay on your workspace for easy sketching."
                }
              </p>
            </div>
          </div>
        )}
      </div>

      <ControlPanel
        opacity={opacity}
        onOpacityChange={setOpacity}
        isLocked={isLocked}
        onLockToggle={() => setIsLocked(!isLocked)}
        onRotateLeft={handleRotateLeft}
        onRotateRight={handleRotateRight}
        onReset={handleReset}
        onZoomIn={handleZoomIn}
        onZoomOut={handleZoomOut}
        onFlashlightToggle={hasFlashlight() ? handleFlashlightToggle : undefined}
        isFlashlightOn={isFlashlightOn}
        hasImage={!!selectedImage}
      />
    </div>
  );
}