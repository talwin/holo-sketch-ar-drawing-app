import { useState, useRef, useEffect } from 'react';

interface Transform {
  x: number;
  y: number;
  scale: number;
  rotation: number;
}

interface AROverlayProps {
  imageUrl: string;
  opacity: number;
  isLocked: boolean;
  onTransformChange?: (transform: Transform) => void;
}

export function AROverlay({ imageUrl, opacity, isLocked, onTransformChange }: AROverlayProps) {
  const [transform, setTransform] = useState<Transform>({
    x: 0,
    y: 0,
    scale: 1,
    rotation: 0
  });
  
  const [isDragging, setIsDragging] = useState(false);
  const [lastTouch, setLastTouch] = useState({ x: 0, y: 0 });
  const [initialDistance, setInitialDistance] = useState(0);
  const [initialScale, setInitialScale] = useState(1);
  const overlayRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Reset and center the image when the imageUrl changes
    if (overlayRef.current) {
      const { clientWidth, clientHeight } = overlayRef.current;
      setTransform({
        x: clientWidth / 2,
        y: clientHeight / 2,
        scale: 1,
        rotation: 0,
      });
    }
  }, [imageUrl]);

  useEffect(() => {
    onTransformChange?.(transform);
  }, [transform, onTransformChange]);

  const getDistance = (touch1: React.Touch, touch2: React.Touch) => {
    const dx = touch1.clientX - touch2.clientX;
    const dy = touch1.clientY - touch2.clientY;
    return Math.sqrt(dx * dx + dy * dy);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    if (isLocked) return;
    
    e.preventDefault();
    
    if (e.touches.length === 1) {
      setIsDragging(true);
      setLastTouch({
        x: e.touches[0].clientX,
        y: e.touches[0].clientY
      });
    } else if (e.touches.length === 2) {
      setIsDragging(false);
      const distance = getDistance(e.touches[0], e.touches[1]);
      setInitialDistance(distance);
      setInitialScale(transform.scale);
    }
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (isLocked) return;
    
    e.preventDefault();
    
    if (e.touches.length === 1 && isDragging) {
      const deltaX = e.touches[0].clientX - lastTouch.x;
      const deltaY = e.touches[0].clientY - lastTouch.y;
      
      setTransform(prev => ({
        ...prev,
        x: prev.x + deltaX,
        y: prev.y + deltaY
      }));
      
      setLastTouch({
        x: e.touches[0].clientX,
        y: e.touches[0].clientY
      });
    } else if (e.touches.length === 2) {
      const distance = getDistance(e.touches[0], e.touches[1]);
      const scaleChange = distance / initialDistance;
      const newScale = Math.max(0.1, Math.min(5, initialScale * scaleChange));
      
      setTransform(prev => ({
        ...prev,
        scale: newScale
      }));
    }
  };

  const handleTouchEnd = () => {
    setIsDragging(false);
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    if (isLocked) return;
    
    setIsDragging(true);
    setLastTouch({
      x: e.clientX,
      y: e.clientY
    });
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isLocked || !isDragging) return;
    
    const deltaX = e.clientX - lastTouch.x;
    const deltaY = e.clientY - lastTouch.y;
    
    setTransform(prev => ({
      ...prev,
      x: prev.x + deltaX,
      y: prev.y + deltaY
    }));
    
    setLastTouch({
      x: e.clientX,
      y: e.clientY
    });
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleWheel = (e: React.WheelEvent) => {
    if (isLocked) return;
    
    e.preventDefault();
    const scaleChange = e.deltaY > 0 ? 0.9 : 1.1;
    const newScale = Math.max(0.1, Math.min(5, transform.scale * scaleChange));
    
    setTransform(prev => ({
      ...prev,
      scale: newScale
    }));
  };

  const resetTransform = () => {
    setTransform({
      x: 0,
      y: 0,
      scale: 1,
      rotation: 0
    });
  };

  const rotate = (degrees: number) => {
    setTransform(prev => ({
      ...prev,
      rotation: prev.rotation + degrees
    }));
  };

  // Expose methods for external control
  useEffect(() => {
    const element = overlayRef.current;
    if (element) {
      (element as any).resetTransform = resetTransform;
      (element as any).rotate = rotate;
      (element as any).setScale = (scale: number) => {
        setTransform(prev => ({ ...prev, scale: Math.max(0.1, Math.min(5, scale)) }));
      };
    }
  }, []);

  return (
    <div
      ref={overlayRef}
      className="absolute inset-0 pointer-events-auto touch-none"
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onWheel={handleWheel}
    >
      <img
        src={imageUrl}
        alt="AR Overlay"
        className={`absolute max-w-none ${isLocked ? 'cursor-not-allowed' : 'cursor-move'}`}
        style={{
          opacity: opacity / 100,
          transform: `translate(${transform.x}px, ${transform.y}px) scale(${transform.scale}) rotate(${transform.rotation}deg)`,
          transformOrigin: 'center',
          left: '50%',
          top: '50%',
          marginLeft: '-50%',
          marginTop: '-50%',
          pointerEvents: isLocked ? 'none' : 'auto'
        }}
        draggable={false}
      />
    </div>
  );
}