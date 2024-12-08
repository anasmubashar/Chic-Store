import { Camera, Pencil } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

interface ProfileHeaderProps {
  name: string;
  location: string;
  profilePicture?: string;
  onEdit: () => void;
  onUploadPhoto: (file: File) => void;
}

export function ProfileHeader({ name, location, profilePicture, onEdit, onUploadPhoto }: ProfileHeaderProps) {
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      onUploadPhoto(file);
    }
  };

  return (
    <div className="flex items-center justify-between p-6 border-b">
      <div className="flex items-center gap-6">
        <div className="relative">
          <Avatar className="h-24 w-24">
            <AvatarImage src={profilePicture} />
            <AvatarFallback>{name.charAt(0)}</AvatarFallback>
          </Avatar>
          <label className="absolute bottom-0 right-0 p-1 bg-primary rounded-full cursor-pointer">
            <Camera className="h-4 w-4 text-white" />
            <input type="file" className="hidden" onChange={handleFileChange} accept="image/*" />
          </label>
        </div>
        <div className="space-y-1">
          <h2 className="text-2xl font-bold">{name}</h2>
          <p className="text-muted-foreground flex items-center gap-2">
            <span className="inline-block">{location}</span>
          </p>
        </div>
      </div>
      <Button variant="outline" size="sm" onClick={onEdit}>
        <Pencil className="h-4 w-4 mr-2" />
        Edit Profile
      </Button>
    </div>
  );
}