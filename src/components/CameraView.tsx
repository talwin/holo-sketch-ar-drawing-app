import { useEffect, useRef, useState } from 'react';
import { Button } from './ui/button';
import { Camera, RefreshCw } from 'lucide-react';

interface CameraViewProps {
  onCameraReady: (stream: MediaStream | null) => void;
}

export function CameraView({ onCameraReady }: CameraViewProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);
  const [error, setError] = useState<string>('');
  const [isRetrying, setIsRetrying] = useState(false);

  const startCamera = async () => {
    if (typeof navigator.mediaDevices === 'undefined' || !navigator.mediaDevices.getUserMedia) {
      setError('Camera not supported in this browser.');
      setHasPermission(false);
      onCameraReady(null);
      return;
    }
    try {
      setIsRetrying(true);
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { 
          facingMode: 'environment', // Use back camera
          width: { ideal: 1280 },
          height: { ideal: 720 }
        }
      });
      
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        setHasPermission(true);
        setError('');
        onCameraReady(stream);
      }
    } catch (err: any) {
      console.error('Error accessing camera:', err);
      let errorMessage = 'Unable to access camera.';
      
      if (err.name === 'NotAllowedError') {
        errorMessage = 'Camera permission denied. Please allow camera access in your browser settings and refresh the page.';
      } else if (err.name === 'NotFoundError') {
        errorMessage = 'No camera found on this device.';
      } else if (err.name === 'NotSupportedError') {
        errorMessage = 'Camera not supported in this browser.';
      } else if (err.name === 'NotReadableError') {
        errorMessage = 'Camera is already in use by another application.';
      }
      
      setError(errorMessage);
      setHasPermission(false);
      onCameraReady(null);
    } finally {
      setIsRetrying(false);
    }
  };

  useEffect(() => {
    startCamera();

    return () => {
      if (videoRef.current?.srcObject) {
        const stream = videoRef.current.srcObject as MediaStream;
        stream.getTracks().forEach(track => track.stop());
      }
    };
  }, []);

  const handleRetry = () => {
    startCamera();
  };

  return (
    <div className="flex-1 relative overflow-hidden bg-black">
      <video
        ref={videoRef}
        autoPlay
        playsInline
        muted
        className={`w-full h-full object-cover transition-opacity duration-500 ${hasPermission ? 'opacity-100' : 'opacity-0'}`}
        onCanPlay={() => {
          if (videoRef.current && videoRef.current.srcObject) {
            setHasPermission(true);
          }
        }}
      />
      {hasPermission === false && (
        <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-gray-900 to-black text-white p-6">
          <div className="text-center max-w-md">
            <div className="mb-4 w-16 h-16 mx-auto bg-white/10 rounded-full flex items-center justify-center">
              <Camera className="w-8 h-8 text-white/60" />
            </div>
            <h3 className="mb-3">Camera Not Available</h3>
            <p className="text-white/80 mb-6 leading-relaxed">{error}</p>
            <div className="space-y-3">
              <Button
                onClick={handleRetry}
                disabled={isRetrying}
                className="bg-blue-600 hover:bg-blue-700 text-white"
              >
                {isRetrying ? (
                  <>
                    <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                    Retrying...
                  </>
                ) : (
                  <>
                    <Camera className="w-4 h-4 mr-2" />
                    Try Again
                  </>
                )}
              </Button>
              <p className="text-sm text-white/60">
                You can still use HoloSketch without camera access by importing photos to trace.
              </p>
            </div>
          </div>
        </div>
      )}
      {hasPermission === null && (
        <div className="absolute inset-0 flex items-center justify-center bg-black text-white">
          <div className="text-center">
            <div className="animate-pulse mb-2">Starting camera...</div>
            <div className="w-8 h-1 bg-white/20 rounded-full mx-auto overflow-hidden">
              <div className="w-full h-full bg-gradient-to-r from-blue-500 to-purple-500 animate-pulse"></div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}