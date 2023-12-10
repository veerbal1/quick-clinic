import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { CircleIcon, StarIcon } from '@radix-ui/react-icons';

function PatientProfile({
  name,
  timing,
  age,
  gender,
  healthIssues,
}: {
  name: string;
  timing: string;
  age: string;
  gender: string;
  healthIssues: string;
}) {
  return (
    <div className="flex justify-start pt-6 sticky top-0 w-full">
      <Card className="w-full">
        <CardHeader className="grid items-start gap-4 space-y-0">
          <div className="space-y-1">
            <CardTitle className="flex whitespace-nowrap items-center">
              {name}
            </CardTitle>
            <CardDescription>
              {timing}
              <br />
              {healthIssues}
            </CardDescription>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex space-x-4 text-sm text-muted-foreground">
            <div className="flex items-center">Age: {age}</div>
            <div>{gender.charAt(0).toUpperCase() + gender.slice(1)}</div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default PatientProfile;
