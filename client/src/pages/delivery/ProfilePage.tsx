import { useEffect, useState } from 'react';
import { useToast } from '../../hooks/use-toast';
import { ProfileHeader } from '../../components/Delivery/profile/ProfileHeader';
import { ProfileDetails } from '../../components/Delivery/profile/ProfileDetails';
import { ProfileForm } from '../../components/Delivery/profile/ProfileForm';
import { profileApi } from '../../lib/profileApi';
import { ProfileData, ProfileState } from '../../types/profile';

export function ProfilePage() {
  const [state, setState] = useState<ProfileState>({
    data: null,
    isLoading: true,
    error: null,
    isEditing: false,
  });

  const { toast } = useToast();

  useEffect(() => {
    loadProfile();
  }, []);

  const loadProfile = async () => {
    try {
      const response = await profileApi.getProfile();
      setState(prev => ({ ...prev, data: response.data, isLoading: false }));
    } catch (error) {
      setState(prev => ({ 
        ...prev, 
        error: 'Failed to load profile', 
        isLoading: false 
      }));
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to load profile data",
      });
    }
  };

  const handleSubmit = async (data: ProfileData) => {
    try {
      if (state.data?.id) {
        await profileApi.updateProfile(state.data.id, data);
      } else {
        await profileApi.createProfile(data);
      }
      await loadProfile();
      setState(prev => ({ ...prev, isEditing: false }));
      toast({
        title: "Success",
        description: "Profile updated successfully",
      });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to update profile",
      });
    }
  };

  const handleUploadPhoto = async (file: File) => {
    try {
      if (!state.data?.id) return;
      await profileApi.uploadProfilePicture(state.data.id, file);
      await loadProfile();
      toast({
        title: "Success",
        description: "Profile picture updated successfully",
      });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to upload profile picture",
      });
    }
  };

  if (state.isLoading) {
    return <div className="flex items-center justify-center h-screen">Loading...</div>;
  }

  if (state.error) {
    return <div className="text-red-500">{state.error}</div>;
  }

  return (
    <div className="container mx-auto py-6">
      <div className="bg-white rounded-lg shadow-sm">
        {state.data && !state.isEditing ? (
          <>
            <ProfileHeader
              name={state.data.name}
              location={state.data.location}
              profilePicture={state.data.profilePicture}
              onEdit={() => setState(prev => ({ ...prev, isEditing: true }))}
              onUploadPhoto={handleUploadPhoto}
            />
            <ProfileDetails profile={state.data} />
          </>
        ) : (
          <ProfileForm
            initialData={state.data || undefined}
            onSubmit={handleSubmit}
            onCancel={() => setState(prev => ({ ...prev, isEditing: false }))}
          />
        )}
      </div>
    </div>
  );
}