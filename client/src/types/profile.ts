export interface ProfileData {
    id?: string;
    name: string;
    location: string;
    cities: Array<{
      name: string;
      isActive: boolean;
    }>;
    numberOfBuses: number;
    numberOfDrivers: number;
    contactDetails: {
      phoneNumber: string;
      address: string;
    };
    profilePicture?: string;
  }
  
  export interface ProfileState {
    data: ProfileData | null;
    isLoading: boolean;
    error: string | null;
    isEditing: boolean;
  }