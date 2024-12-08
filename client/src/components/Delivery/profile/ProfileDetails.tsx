import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ProfileData } from '../../../types/profile';

interface ProfileDetailsProps {
  profile: ProfileData;
}

export function ProfileDetails({ profile }: ProfileDetailsProps) {
  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 p-6">
      <Card>
        <CardHeader>
          <CardTitle>Contact Details</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          <div>
            <p className="text-sm font-medium">Phone Number</p>
            <p className="text-sm text-muted-foreground">{profile.contactDetails.phoneNumber}</p>
          </div>
          <div>
            <p className="text-sm font-medium">Address</p>
            <p className="text-sm text-muted-foreground">{profile.contactDetails.address}</p>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Service Statistics</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          <div>
            <p className="text-sm font-medium">Number of Buses</p>
            <p className="text-sm text-muted-foreground">{profile.numberOfBuses}</p>
          </div>
          <div>
            <p className="text-sm font-medium">Number of Drivers</p>
            <p className="text-sm text-muted-foreground">{profile.numberOfDrivers}</p>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Cities Serviced</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-1">
            {profile.cities.map((city, index) => (
              <li key={index} className="text-sm">
                {city.name}
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>
    </div>
  );
}