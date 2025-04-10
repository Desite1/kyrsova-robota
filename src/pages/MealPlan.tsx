
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/Button";
import Layout from "@/components/Layout";
import UserProfile, { UserProfileData } from "@/components/UserProfile";
import MealCard, { Meal } from "@/components/MealCard";
import { useMealPlan } from "@/hooks/useMealPlan";
import { Check, ArrowRight, Calendar } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const MealPlan = () => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState<UserProfileData>({});
  const [loading, setLoading] = useState<boolean>(true);
  const [weeklyView, setWeeklyView] = useState<boolean>(false);
  const [selectedDay, setSelectedDay] = useState<string>("Today");

  useEffect(() => {
    // Load user data from localStorage
    const storedData = localStorage.getItem('userProfileData');
    if (storedData) {
      setUserData(JSON.parse(storedData));
      // Simulate API loading
      setTimeout(() => {
        setLoading(false);
      }, 800);
    } else {
      // If no data, redirect back to onboarding
      navigate('/onboarding');
    }
  }, [navigate]);

  const mealPlan = useMealPlan(userData);
  const weeklyMealPlan = mealPlan?.weeklyPlan;

  // Get current day name
  const getCurrentDayName = () => {
    const days = ["Неділя", "Понеділок", "Вівторок", "Середа", "Четвер", "П'ятниця", "Субота"];
    const today = new Date().getDay();
    return days[today];
  };

  const handleRegenerate = () => {
    setLoading(true);
    // Force re-render by setting a minor change to user data
    const updatedUserData = {
      ...userData,
      timestamp: Date.now()
    };
    setUserData(updatedUserData);
    localStorage.setItem('userProfileData', JSON.stringify(updatedUserData));

    // Simulate API loading
    setTimeout(() => {
      setLoading(false);
    }, 800);
  };

  const handleReset = () => {
    // Clear user data and go back to start
    localStorage.removeItem('userProfileData');
    navigate('/');
  };

  const toggleView = () => {
    setWeeklyView(!weeklyView);
    setSelectedDay("Today");
  };

  const handleDaySelect = (day: string) => {
    setSelectedDay(day);
    setWeeklyView(false);
  };

  // Get meals for the selected day
  const getSelectedDayMeals = () => {
    if (!weeklyMealPlan) return mealPlan?.meals || [];
    if (selectedDay === "Today") {
      return mealPlan?.meals || [];
    }
    return weeklyMealPlan[selectedDay] || [];
  };

  return <Layout title="Ваш План Харчування">
      <div className="flex flex-col gap-6 pb-8">
        <UserProfile userData={userData} className="animate-fade-in" />
        
        {loading ? <div className="flex flex-col gap-4 my-4 animate-pulse">
            <div className="h-5 w-32 bg-secondary rounded-md"></div>
            <div className="h-32 w-full bg-secondary rounded-lg"></div>
            <div className="h-32 w-full bg-secondary rounded-lg"></div>
            <div className="h-32 w-full bg-secondary rounded-lg"></div>
          </div> : mealPlan ? <>
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 animate-fade-in">
              <div className="flex flex-col">
                <h2 className="text-lg font-medium mb-1">Щоденне Харчування</h2>
                <div className="flex items-center gap-3 text-sm flex-wrap">
                  <span className="text-muted-foreground">
                    Ціль: <strong className="text-foreground">{mealPlan.dailyCalories} ккал</strong>
                  </span>
                  <span className="text-muted-foreground flex gap-1 items-center">
                    <Check size={14} className="text-accent flex-shrink-0" />
                    Персоналізовано
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-2 mt-2 sm:mt-0">
                <Select value={selectedDay} onValueChange={handleDaySelect}>
                  <SelectTrigger className="w-[150px]">
                    <Calendar className="mr-2 h-4 w-4 flex-shrink-0" />
                    <SelectValue placeholder="Виберіть день" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Today">Сьогодні ({getCurrentDayName()})</SelectItem>
                    <SelectItem value="Monday">Понеділок</SelectItem>
                    <SelectItem value="Tuesday">Вівторок</SelectItem>
                    <SelectItem value="Wednesday">Середа</SelectItem>
                    <SelectItem value="Thursday">Четвер</SelectItem>
                    <SelectItem value="Friday">П'ятниця</SelectItem>
                    <SelectItem value="Saturday">Субота</SelectItem>
                    <SelectItem value="Sunday">Неділя</SelectItem>
                  </SelectContent>
                </Select>
                
              </div>
            </div>
            
            <div className="grid grid-cols-3 gap-3 p-3 bg-secondary/50 rounded-lg animate-fade-in">
              <div className="flex flex-col items-center">
                <span className="text-sm text-muted-foreground mb-1">Білки</span>
                <span className="font-medium">{mealPlan.macros.protein}г</span>
              </div>
              <div className="flex flex-col items-center border-x border-border">
                <span className="text-sm text-muted-foreground mb-1">Вуглеводи</span>
                <span className="font-medium">{mealPlan.macros.carbs}г</span>
              </div>
              <div className="flex flex-col items-center">
                <span className="text-sm text-muted-foreground mb-1">Жири</span>
                <span className="font-medium">{mealPlan.macros.fat}г</span>
              </div>
            </div>
            
            {weeklyView ? <div className="flex flex-col gap-6 animate-fade-in">
                <h2 className="text-lg font-medium mt-2">Ваш Тижневий План</h2>
                
                {weeklyMealPlan && Object.entries(weeklyMealPlan).map(([day, meals], dayIndex) => {
                  // Translate day names
                  const translatedDays: {[key: string]: string} = {
                    "Monday": "Понеділок",
                    "Tuesday": "Вівторок",
                    "Wednesday": "Середа",
                    "Thursday": "Четвер",
                    "Friday": "П'ятниця",
                    "Saturday": "Субота",
                    "Sunday": "Неділя"
                  };
                  
                  return <div key={day} className="animate-fade-in">
                    <h3 className="font-medium text-md mb-3 text-accent">{translatedDays[day] || day}</h3>
                    <div className="flex flex-col gap-4">
                      {meals.map((meal, mealIndex) => <MealCard key={`${day}-${meal.id}`} meal={meal} className="animate-fade-in" />)}
                    </div>
                  </div>;
                })}
              </div> : <>
                <h2 className="text-lg font-medium mt-2 animate-fade-in">
                  {selectedDay === "Today" ? "Ваші Страви на Сьогодні" : (() => {
                    const translatedDays: {[key: string]: string} = {
                      "Monday": "Понеділок",
                      "Tuesday": "Вівторок",
                      "Wednesday": "Середа",
                      "Thursday": "Четвер",
                      "Friday": "П'ятниця",
                      "Saturday": "Субота",
                      "Sunday": "Неділя"
                    };
                    return `Страви на ${translatedDays[selectedDay] || selectedDay}`;
                  })()}
                </h2>
                
                <div className="flex flex-col gap-4">
                  {getSelectedDayMeals().map((meal, index) => <MealCard key={meal.id} meal={meal} className="animate-fade-in" />)}
                </div>
              </>}
          </> : <div className="text-center py-10">
            <p className="text-muted-foreground">
              Не вдалося згенерувати план харчування. Спробуйте ще раз.
            </p>
          </div>}
        
        <div className="flex flex-col gap-3 mt-4 animate-fade-in">
          <Button variant="outline" size="full" onClick={handleRegenerate} disabled={loading}>
            Оновити План Харчування
          </Button>
          <Button variant="secondary" size="full" onClick={handleReset}>
            Почати Спочатку
          </Button>
        </div>
      </div>
    </Layout>;
};

export default MealPlan;
