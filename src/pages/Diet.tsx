
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/Button";
import { Card, CardContent } from "@/components/Card";
import OnboardingLayout from "@/components/OnboardingLayout";
import { UserProfileData } from "@/components/UserProfile";

const Diet = () => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState<UserProfileData>({});
  const [selectedDiet, setSelectedDiet] = useState<'omnivore' | 'vegetarian' | undefined>(undefined);
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

  const handleDietSelect = (diet: 'omnivore' | 'vegetarian') => {
    setSelectedDiet(diet);
    setError(null);
  };

  const handleContinue = () => {
    if (!selectedDiet) {
      setError('Будь ласка, оберіть тип харчування, щоб продовжити');
      return;
    }

    // Update user data with selected diet
    const updatedUserData = {
      ...userData,
      diet: selectedDiet,
    };

    // Store updated data in localStorage
    localStorage.setItem('userProfileData', JSON.stringify(updatedUserData));
    
    // Navigate to meal plan page
    navigate('/meal-plan');
  };

  return (
    <OnboardingLayout
      title="Тип харчування"
      description="Оберіть ваші дієтичні вподобання"
    >
      <div className="flex-1 flex flex-col">
        <div className="grid gap-4 mb-8 animate-fade-in" style={{ animationDelay: "100ms" }}>
          <Card
            onClick={() => handleDietSelect('omnivore')}
            selected={selectedDiet === 'omnivore'}
            className="h-[180px] flex flex-col"
          >
            <CardContent className="flex flex-col items-center justify-center h-full text-center p-4">
              <div className="h-12 w-12 rounded-full bg-accent/10 flex items-center justify-center mb-4">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M16 11.5L16 15C16 17.2091 14.2091 19 12 19V19C9.79086 19 8 17.2091 8 15L8 11.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                  <path d="M16 5L16 11.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                  <path d="M8 5L8 11.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                  <rect x="8.5" y="7.5" width="7" height="4" rx="1.5" stroke="currentColor" strokeWidth="1.5" />
                </svg>
              </div>
              <h3 className="font-medium text-lg mb-1">Звичайне харчування</h3>
              <p className="text-sm text-muted-foreground">
                Включає всі групи продуктів, у тому числі м'ясо
              </p>
            </CardContent>
          </Card>

          <Card
            onClick={() => handleDietSelect('vegetarian')}
            selected={selectedDiet === 'vegetarian'}
            className="h-[180px] flex flex-col"
          >
            <CardContent className="flex flex-col items-center justify-center h-full text-center p-4">
              <div className="h-12 w-12 rounded-full bg-accent/10 flex items-center justify-center mb-4">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 6.00003C15.3137 6.00003 18 8.68631 18 12C18 15.3137 15.3137 18 12 18C8.68629 18 6 15.3137 6 12C6 8.68631 8.68629 6.00003 12 6.00003Z" stroke="currentColor" strokeWidth="1.5" />
                  <path d="M22 12L18 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                  <path d="M6 12L2 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                  <path d="M12 6.00003V2.00003" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                  <path d="M12 22L12 18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                </svg>
              </div>
              <h3 className="font-medium text-lg mb-1">Вегетаріанське</h3>
              <p className="text-sm text-muted-foreground">
                Рослинна дієта без м'ясних продуктів
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
            Створити план харчування
          </Button>
        </div>
      </div>
    </OnboardingLayout>
  );
};

export default Diet;
