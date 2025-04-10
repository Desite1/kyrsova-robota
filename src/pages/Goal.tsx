
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/Button";
import { Card, CardContent } from "@/components/Card";
import OnboardingLayout from "@/components/OnboardingLayout";
import { UserProfileData } from "@/components/UserProfile";

const Goal = () => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState<UserProfileData>({});
  const [selectedGoal, setSelectedGoal] = useState<'muscle' | 'weight-loss' | undefined>(undefined);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Load user data from localStorage
    const storedData = localStorage.getItem('userProfileData');
    if (storedData) {
      setUserData(JSON.parse(storedData));
    } else {
      // If no data, redirect back to onboarding
      navigate('/onboarding');
    }
  }, [navigate]);

  const handleGoalSelect = (goal: 'muscle' | 'weight-loss') => {
    setSelectedGoal(goal);
    setError(null);
  };

  const handleContinue = () => {
    if (!selectedGoal) {
      setError('Будь ласка, оберіть ціль, щоб продовжити');
      return;
    }

    // Update user data with selected goal
    const updatedUserData = {
      ...userData,
      goal: selectedGoal,
    };

    // Store updated data in localStorage
    localStorage.setItem('userProfileData', JSON.stringify(updatedUserData));
    
    // Navigate to next step
    navigate('/diet');
  };

  return (
    <OnboardingLayout
      title="Яка ваша мета?"
      description="Оберіть вашу основну фітнес-ціль"
    >
      <div className="flex-1 flex flex-col">
        <div className="grid gap-4 mb-8 animate-fade-in" style={{ animationDelay: "100ms" }}>
          <Card
            onClick={() => handleGoalSelect('muscle')}
            selected={selectedGoal === 'muscle'}
            className="h-[180px] flex flex-col"
          >
            <CardContent className="flex flex-col items-center justify-center h-full text-center p-4">
              <div className="h-12 w-12 rounded-full bg-accent/10 flex items-center justify-center mb-4">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M6.5 6.5L17.5 17.5M6.5 17.5L17.5 6.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                  <path d="M3 15L3 9M21 15V9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                  <path d="M7.5 18.5L7.5 5.5M16.5 18.5V5.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                </svg>
              </div>
              <h3 className="font-medium text-lg mb-1">Набір м'язової маси</h3>
              <p className="text-sm text-muted-foreground">
                Розвиток сили та збільшення м'язової маси
              </p>
            </CardContent>
          </Card>

          <Card
            onClick={() => handleGoalSelect('weight-loss')}
            selected={selectedGoal === 'weight-loss'}
            className="h-[180px] flex flex-col"
          >
            <CardContent className="flex flex-col items-center justify-center h-full text-center p-4">
              <div className="h-12 w-12 rounded-full bg-accent/10 flex items-center justify-center mb-4">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M20 9L4 9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                  <path d="M20 15L12 15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                  <path d="M20 4L8 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                  <path d="M20 20L4 20" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                </svg>
              </div>
              <h3 className="font-medium text-lg mb-1">Зниження ваги</h3>
              <p className="text-sm text-muted-foreground">
                Зменшення жирової маси зі збереженням м'язів
              </p>
            </CardContent>
          </Card>
        </div>

        {error && (
          <p className="text-destructive text-sm mb-4 animate-fade-in">
            {error}
          </p>
        )}

        <div className="mt-auto animate-fade-in" style={{ animationDelay: "200ms" }}>
          <Button
            variant="accent"
            size="full"
            onClick={handleContinue}
          >
            Продовжити
          </Button>
        </div>
      </div>
    </OnboardingLayout>
  );
};

export default Goal;
