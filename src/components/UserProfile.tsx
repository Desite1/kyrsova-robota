
import React from "react";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "./Card";

export interface UserProfileData {
  age?: number;
  gender?: 'male' | 'female' | 'other';
  weight?: number;
  height?: number;
  goal?: 'muscle' | 'weight-loss';
  diet?: 'omnivore' | 'vegetarian';
}

interface UserProfileProps {
  userData: UserProfileData;
  className?: string;
}

const UserProfile: React.FC<UserProfileProps> = ({ 
  userData,
  className 
}) => {
  const { age, gender, weight, height, goal, diet } = userData;
  
  // Calculate BMI if weight and height are provided
  const bmi = weight && height 
    ? (weight / Math.pow(height / 100, 2)).toFixed(1)
    : undefined;
  
  // Helper function to format the goal text
  const formatGoal = (goal?: 'muscle' | 'weight-loss') => {
    if (!goal) return 'Not specified';
    return goal === 'muscle' ? 'Muscle Gain' : 'Weight Loss';
  };
  
  // Helper function to format the diet text
  const formatDiet = (diet?: 'omnivore' | 'vegetarian') => {
    if (!diet) return 'Not specified';
    return diet === 'omnivore' ? 'Regular (with meat)' : 'Vegetarian';
  };

  return (
    <Card className={className} glass>
      <CardHeader>
        <CardTitle>Profile Summary</CardTitle>
        <CardDescription>Your personal details and preferences</CardDescription>
      </CardHeader>
      <CardContent className="grid grid-cols-2 gap-4">
        <div>
          <p className="text-sm text-muted-foreground mb-1">Age</p>
          <p className="font-medium">{age ?? 'Not specified'}</p>
        </div>
        <div>
          <p className="text-sm text-muted-foreground mb-1">Gender</p>
          <p className="font-medium capitalize">{gender ?? 'Not specified'}</p>
        </div>
        <div>
          <p className="text-sm text-muted-foreground mb-1">Weight</p>
          <p className="font-medium">{weight ? `${weight} kg` : 'Not specified'}</p>
        </div>
        <div>
          <p className="text-sm text-muted-foreground mb-1">Height</p>
          <p className="font-medium">{height ? `${height} cm` : 'Not specified'}</p>
        </div>
        {bmi && (
          <div className="col-span-2">
            <p className="text-sm text-muted-foreground mb-1">BMI</p>
            <p className="font-medium">{bmi}</p>
          </div>
        )}
        <div className="col-span-2 border-t pt-3 mt-1">
          <p className="text-sm text-muted-foreground mb-1">Goal</p>
          <p className="font-medium">{formatGoal(goal)}</p>
        </div>
        <div className="col-span-2">
          <p className="text-sm text-muted-foreground mb-1">Diet Type</p>
          <p className="font-medium">{formatDiet(diet)}</p>
        </div>
      </CardContent>
    </Card>
  );
};

export default UserProfile;
