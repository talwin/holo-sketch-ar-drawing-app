import { PhotoImport } from './PhotoImport';

interface AppHeaderProps {
  onImageSelect: (imageUrl: string) => void;
}

export function AppHeader({ onImageSelect }: AppHeaderProps) {
  return (
    <div className="bg-black/90 backdrop-blur-sm p-4 flex items-center justify-between border-b border-white/10">
      <div className="flex items-center space-x-3">
        <div className="w-8 h-8 bg-gradient-to-br from-blue-400 to-purple-600 rounded-lg flex items-center justify-center">
          <span className="text-white font-bold text-sm">H</span>
        </div>
        <div>
          <h1 className="text-white font-semibold">HoloSketch</h1>
          <p className="text-white/60 text-sm">AR Sketch Guide</p>
        </div>
      </div>
      
      <PhotoImport 
        onImageSelect={onImageSelect} 
        disabled={false}
      />
    </div>
  );
}