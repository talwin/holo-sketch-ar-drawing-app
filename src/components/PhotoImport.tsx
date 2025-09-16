import { useRef } from 'react';
import { Button } from './ui/button';
import { ImageIcon } from 'lucide-react';

interface PhotoImportProps {
  onImageSelect: (imageUrl: string) => void;
  disabled?: boolean;
}

export function PhotoImport({ onImageSelect, disabled }: PhotoImportProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result as string;
        onImageSelect(result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleButtonClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <>
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileSelect}
        className="hidden"
      />
      <Button
        onClick={handleButtonClick}
        disabled={disabled}
        variant="outline"
        size="sm"
        className="bg-black/20 border-white/20 text-white hover:bg-white/10"
      >
        <ImageIcon className="w-4 h-4 mr-2" />
        Import Photo
      </Button>
    </>
  );
}