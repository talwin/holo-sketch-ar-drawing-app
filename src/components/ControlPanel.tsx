import { Button } from './ui/button';
import { Slider } from './ui/slider';
import { 
  RotateCw, 
  RotateCcw, 
  Lock, 
  Unlock, 
  RotateCcw as Reset,
  ZoomIn,
  ZoomOut,
  Flashlight
} from 'lucide-react';

interface ControlPanelProps {
  opacity: number;
  onOpacityChange: (opacity: number) => void;
  isLocked: boolean;
  onLockToggle: () => void;
  onRotateLeft: () => void;
  onRotateRight: () => void;
  onReset: () => void;
  onZoomIn: () => void;
  onZoomOut: () => void;
  onFlashlightToggle?: () => void;
  isFlashlightOn?: boolean;
  hasImage: boolean;
}

export function ControlPanel({
  opacity,
  onOpacityChange,
  isLocked,
  onLockToggle,
  onRotateLeft,
  onRotateRight,
  onReset,
  onZoomIn,
  onZoomOut,
  onFlashlightToggle,
  isFlashlightOn,
  hasImage
}: ControlPanelProps) {
  return (
    <div className="bg-black/80 backdrop-blur-sm p-4 space-y-4">
      {/* Opacity Control */}
      {hasImage && (
        <div className="space-y-2">
          <label className="text-white">
            Opacity: {opacity}%
          </label>
          <Slider
            value={[opacity]}
            onValueChange={(value) => onOpacityChange(value[0])}
            max={100}
            min={0}
            step={5}
            className="w-full"
          />
        </div>
      )}

      {/* Transform Controls */}
      {hasImage && (
        <div className="flex flex-wrap gap-2 justify-center">
          <Button
            size="sm"
            variant="outline"
            onClick={onZoomOut}
            disabled={isLocked}
            className="bg-black/20 border-white/20 text-white hover:bg-white/10"
          >
            <ZoomOut className="w-4 h-4" />
          </Button>
          
          <Button
            size="sm"
            variant="outline"
            onClick={onZoomIn}
            disabled={isLocked}
            className="bg-black/20 border-white/20 text-white hover:bg-white/10"
          >
            <ZoomIn className="w-4 h-4" />
          </Button>

          <Button
            size="sm"
            variant="outline"
            onClick={onRotateLeft}
            disabled={isLocked}
            className="bg-black/20 border-white/20 text-white hover:bg-white/10"
          >
            <RotateCcw className="w-4 h-4" />
          </Button>

          <Button
            size="sm"
            variant="outline"
            onClick={onRotateRight}
            disabled={isLocked}
            className="bg-black/20 border-white/20 text-white hover:bg-white/10"
          >
            <RotateCw className="w-4 h-4" />
          </Button>

          <Button
            size="sm"
            variant="outline"
            onClick={onLockToggle}
            className={`border-white/20 text-white hover:bg-white/10 ${
              isLocked ? 'bg-blue-600/50' : 'bg-black/20'
            }`}
          >
            {isLocked ? <Lock className="w-4 h-4" /> : <Unlock className="w-4 h-4" />}
          </Button>

          <Button
            size="sm"
            variant="outline"
            onClick={onReset}
            className="bg-black/20 border-white/20 text-white hover:bg-white/10"
          >
            <Reset className="w-4 h-4" />
          </Button>
        </div>
      )}

      {/* Flashlight Control */}
      {onFlashlightToggle && (
        <div className="flex justify-center">
          <Button
            size="sm"
            variant="outline"
            onClick={onFlashlightToggle}
            className={`border-white/20 text-white hover:bg-white/10 ${
              isFlashlightOn ? 'bg-yellow-600/50' : 'bg-black/20'
            }`}
          >
            <Flashlight className="w-4 h-4 mr-2" />
            Flashlight
          </Button>
        </div>
      )}
    </div>
  );
}