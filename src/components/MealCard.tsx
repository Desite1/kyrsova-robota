
import React from "react";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle,
  CardFooter
} from "./Card";
import { Dumbbell, Utensils } from "lucide-react";

export interface Meal {
  id: string;
  name: string;
  description: string;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  type: 'breakfast' | 'lunch' | 'dinner' | 'snack';
  imageUrl?: string;
}

interface MealCardProps {
  meal: Meal;
  className?: string;
}

const MealCard: React.FC<MealCardProps> = ({ meal, className }) => {
  const { name, description, calories, protein, carbs, fat, type, imageUrl } = meal;

  // Helper function to format the meal type in Ukrainian
  const formatMealType = (type: 'breakfast' | 'lunch' | 'dinner' | 'snack') => {
    const mealTypes = {
      'breakfast': 'Сніданок',
      'lunch': 'Обід',
      'dinner': 'Вечеря',
      'snack': 'Перекус'
    };
    return mealTypes[type] || type.charAt(0).toUpperCase() + type.slice(1);
  };

  // Get meal type icon
  const getMealIcon = (type: 'breakfast' | 'lunch' | 'dinner' | 'snack') => {
    switch(type) {
      case 'breakfast':
        return <Utensils size={14} className="mr-1" />;
      case 'lunch':
        return <Utensils size={14} className="mr-1" />;
      case 'dinner':
        return <Utensils size={14} className="mr-1" />;
      case 'snack':
        return <Dumbbell size={14} className="mr-1" />;
      default:
        return <Utensils size={14} className="mr-1" />;
    }
  };

  return (
    <Card className={`sporty-card ${className}`}>
      <CardHeader className="pb-2">
        <div className="sport-badge mb-1 w-fit">
          {getMealIcon(type)}
          {formatMealType(type)}
        </div>
        <CardTitle className="mb-1">{name}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      {imageUrl && (
        <div className="px-4 mb-3">
          <div className="w-full h-40 rounded-lg overflow-hidden bg-secondary">
            <img 
              src={imageUrl} 
              alt={name} 
              className="w-full h-full object-cover" 
            />
          </div>
        </div>
      )}
      <CardContent>
        <div className="grid grid-cols-4 text-center bg-accent/5 rounded-lg p-3">
          <div className="border-r border-border/30">
            <p className="text-md font-bold text-accent">{calories}</p>
            <p className="text-xs font-semibold uppercase tracking-wider">ккал</p>
          </div>
          <div className="border-r border-border/30">
            <p className="text-md font-bold text-accent">{protein}г</p>
            <p className="text-xs font-semibold uppercase tracking-wider">Білки</p>
          </div>
          <div className="border-r border-border/30">
            <p className="text-md font-bold text-accent">{carbs}г</p>
            <p className="text-xs font-semibold uppercase tracking-wider">Вугл.</p>
          </div>
          <div>
            <p className="text-md font-bold text-accent">{fat}г</p>
            <p className="text-xs font-semibold uppercase tracking-wider">Жири</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default MealCard;
