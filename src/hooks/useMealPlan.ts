
import { useState, useEffect } from "react";
import { UserProfileData } from "@/components/UserProfile";
import { Meal } from "@/components/MealCard";
import { calculateNutritionTargets } from "@/utils/calculations";

// Sample meal data with Ukrainian translations
const sampleMeals: Meal[] = [
  // Breakfast options
  {
    id: 'b1',
    name: 'Грецький йогурт з ягодами',
    description: 'Грецький йогурт з свіжими ягодами та медом',
    calories: 320,
    protein: 20,
    carbs: 40,
    fat: 8,
    type: 'breakfast',
  },
  {
    id: 'b2',
    name: 'Протеїнова вівсянка',
    description: 'Вівсянка з протеїновим порошком, бананом та мигдальним маслом',
    calories: 420,
    protein: 25,
    carbs: 55,
    fat: 12,
    type: 'breakfast',
  },
  {
    id: 'b3',
    name: 'Овочевий омлет',
    description: 'Омлет з білків зі шпинатом, помідорами та сиром фета',
    calories: 280,
    protein: 22,
    carbs: 8,
    fat: 14,
    type: 'breakfast',
  },
  
  // Lunch options
  {
    id: 'l1',
    name: 'Курка з кіноа',
    description: 'Куряче філе з кіноа, запеченими овочами та соусом тахіні',
    calories: 480,
    protein: 35,
    carbs: 45,
    fat: 15,
    type: 'lunch',
  },
  {
    id: 'l2',
    name: 'Ролл з тунцем',
    description: 'Тунець з легким майонезом та овочами в цільнозерновій тортильї',
    calories: 430,
    protein: 30,
    carbs: 40,
    fat: 12,
    type: 'lunch',
  },
  {
    id: 'l3',
    name: 'Сочевичний суп з овочами',
    description: 'Поживний сочевичний суп з морквою, селерою та травами',
    calories: 340,
    protein: 18,
    carbs: 50,
    fat: 6,
    type: 'lunch',
  },
  
  // Dinner options
  {
    id: 'd1',
    name: 'Лосось з запеченими овочами',
    description: 'Запечене філе лосося зі спаржею та солодкою картоплею',
    calories: 520,
    protein: 38,
    carbs: 30,
    fat: 25,
    type: 'dinner',
  },
  {
    id: 'd2',
    name: 'Індичі фрикадельки з цукіні',
    description: 'Фрикадельки з індички з локшиною з цукіні та томатним соусом',
    calories: 440,
    protein: 35,
    carbs: 25,
    fat: 18,
    type: 'dinner',
  },
  {
    id: 'd3',
    name: 'Нут з овочевим каррі',
    description: 'Пряний нут з різноманітними овочами та коричневим рисом',
    calories: 420,
    protein: 15,
    carbs: 65,
    fat: 12,
    type: 'dinner',
  },
  
  // Snack options
  {
    id: 's1',
    name: 'Протеїновий коктейль',
    description: 'Протеїновий порошок з мигдальним молоком та бананом',
    calories: 220,
    protein: 25,
    carbs: 20,
    fat: 3,
    type: 'snack',
  },
  {
    id: 's2',
    name: 'Жменя горіхів',
    description: 'Суміш горіхів з сушеною журавлиною',
    calories: 180,
    protein: 6,
    carbs: 10,
    fat: 14,
    type: 'snack',
  },
  {
    id: 's3',
    name: 'Яблуко з арахісовим маслом',
    description: 'Нарізане яблуко з натуральним арахісовим маслом',
    calories: 200,
    protein: 5,
    carbs: 25,
    fat: 10,
    type: 'snack',
  },
];

// Vegetarian meal options with Ukrainian translations
const vegetarianMeals: Meal[] = [
  // Breakfast options
  {
    id: 'vb1',
    name: 'Грецький йогурт з ягодами',
    description: 'Грецький йогурт з свіжими ягодами та медом',
    calories: 320,
    protein: 20,
    carbs: 40,
    fat: 8,
    type: 'breakfast',
  },
  {
    id: 'vb2',
    name: 'Протеїнова вівсянка',
    description: 'Вівсянка з рослинним протеїном, бананом та мигдальним маслом',
    calories: 400,
    protein: 20,
    carbs: 55,
    fat: 12,
    type: 'breakfast',
  },
  {
    id: 'vb3',
    name: 'Тофу-скрембл',
    description: 'Тофу з куркумою, харчовими дріжджами та овочами',
    calories: 300,
    protein: 18,
    carbs: 12,
    fat: 18,
    type: 'breakfast',
  },
  
  // Lunch options
  {
    id: 'vl1',
    name: 'Кіноа з квасолею',
    description: 'Кіноа з чорною квасолею, кукурудзою, авокадо та лаймовим соусом',
    calories: 450,
    protein: 18,
    carbs: 60,
    fat: 14,
    type: 'lunch',
  },
  {
    id: 'vl2',
    name: 'Ролл з сочевицею',
    description: 'Пряна сочевиця з хумусом та овочами в цільнозерновій тортильї',
    calories: 420,
    protein: 16,
    carbs: 60,
    fat: 10,
    type: 'lunch',
  },
  {
    id: 'vl3',
    name: 'Овочевий суп з квасолею',
    description: 'Суп з різноманітними овочами та білою квасолею',
    calories: 330,
    protein: 15,
    carbs: 48,
    fat: 7,
    type: 'lunch',
  },
  
  // Dinner options
  {
    id: 'vd1',
    name: 'Фаршировані перці',
    description: 'Болгарський перець фарширований кіноа, чорною квасолею та сиром',
    calories: 400,
    protein: 18,
    carbs: 45,
    fat: 15,
    type: 'dinner',
  },
  {
    id: 'vd2',
    name: 'Овочевий бургер з бататом',
    description: 'Рослинний бургер з запеченими бататними фрі',
    calories: 520,
    protein: 22,
    carbs: 70,
    fat: 16,
    type: 'dinner',
  },
  {
    id: 'vd3',
    name: 'Нут з овочевим каррі',
    description: 'Пряний нут з різноманітними овочами та коричневим рисом',
    calories: 420,
    protein: 15,
    carbs: 65,
    fat: 12,
    type: 'dinner',
  },
  
  // Snack options
  {
    id: 'vs1',
    name: 'Рослинний протеїновий коктейль',
    description: 'Рослинний протеїн з мигдальним молоком та бананом',
    calories: 220,
    protein: 20,
    carbs: 25,
    fat: 3,
    type: 'snack',
  },
  {
    id: 'vs2',
    name: 'Жменя горіхів',
    description: 'Суміш горіхів з сушеною журавлиною',
    calories: 180,
    protein: 6,
    carbs: 10,
    fat: 14,
    type: 'snack',
  },
  {
    id: 'vs3',
    name: 'Хумус з овочевими паличками',
    description: 'Хумус з морквяними, огірковими та перцевими паличками',
    calories: 170,
    protein: 6,
    carbs: 18,
    fat: 8,
    type: 'snack',
  },
];

// Add Sunday-specific meals with Ukrainian translations
const sundayMeals: Meal[] = [
  // Breakfast options
  {
    id: 'sb1',
    name: 'Святкова фріттата',
    description: 'Яєчна фріттата зі шпинатом, болгарським перцем і сиром фета',
    calories: 350,
    protein: 22,
    carbs: 15,
    fat: 22,
    type: 'breakfast',
  },
  {
    id: 'sb2',
    name: 'Асаі боул',
    description: 'Ягоди асаі з гранолою, свіжими ягодами та насінням чіа',
    calories: 400,
    protein: 15,
    carbs: 60,
    fat: 12,
    type: 'breakfast',
  },

  // Lunch options
  {
    id: 'sl1',
    name: 'Середземноморський боул з кіноа',
    description: 'Кіноа з запеченими овочами, хумусом та травним соусом',
    calories: 450,
    protein: 20,
    carbs: 55,
    fat: 18,
    type: 'lunch',
  },
  {
    id: 'sl2',
    name: 'Недільний суп із запечених овочів',
    description: 'Поживний овочевий суп із запечених сезонних овочів',
    calories: 320,
    protein: 12,
    carbs: 45,
    fat: 10,
    type: 'lunch',
  },

  // Dinner options
  {
    id: 'sd1',
    name: 'Запечена риба з травами та овочами',
    description: 'Запечена біла риба з травною скоринкою, подана із запеченими сезонними овочами',
    calories: 480,
    protein: 35,
    carbs: 25,
    fat: 22,
    type: 'dinner',
  },
  {
    id: 'sd2',
    name: 'Вегетаріанський пиріг "Пастуший"',
    description: 'Основа з сочевиці та овочів, покрита пюре з батату',
    calories: 420,
    protein: 18,
    carbs: 55,
    fat: 15,
    type: 'dinner',
  },

  // Snack options
  {
    id: 'ss1',
    name: 'Недільний смузі',
    description: 'Протеїновий смузі з бананом, шпинатом та мигдальним молоком',
    calories: 250,
    protein: 20,
    carbs: 30,
    fat: 6,
    type: 'snack',
  },
  {
    id: 'ss2',
    name: 'Домашні енергетичні кульки',
    description: 'Кульки з фініків, горіхів та какао без випікання',
    calories: 200,
    protein: 5,
    carbs: 25,
    fat: 10,
    type: 'snack',
  }
];

// Update the vegetarian meals with Sunday-specific vegetarian options (Ukrainian translation)
const vegetarianSundayMeals: Meal[] = [
  {
    id: 'vsb1',
    name: 'Вегетаріанські святкові млинці',
    description: 'Цільнозернові млинці з ягідним міксом та кленовим сиропом',
    calories: 380,
    protein: 15,
    carbs: 60,
    fat: 10,
    type: 'breakfast',
  },
  {
    id: 'vsl1',
    name: 'Недільний овочевий боул із злаками',
    description: 'Мікс злаків із запеченими овочами та соусом тахіні',
    calories: 420,
    protein: 16,
    carbs: 60,
    fat: 15,
    type: 'lunch',
  },
  {
    id: 'vsd1',
    name: 'Фаршировані гриби портобелло',
    description: 'Гриби портобелло, фаршировані кіноа, шпинатом та веганським сиром',
    calories: 380,
    protein: 20,
    carbs: 35,
    fat: 22,
    type: 'dinner',
  }
];

// The useMealPlan hook implementation
export const useMealPlan = (userData: UserProfileData) => {
  const [mealPlan, setMealPlan] = useState<{
    meals: Meal[];
    dailyCalories: number;
    macros: {
      protein: number;
      carbs: number;
      fat: number;
    };
    weeklyPlan: {
      [key: string]: Meal[];
    };
  } | null>(null);

  useEffect(() => {
    if (!userData || !userData.goal) {
      return;
    }

    // Calculate nutrition targets based on user data
    const nutritionTargets = calculateNutritionTargets(userData);
    if (!nutritionTargets) {
      return;
    }

    // Generate meal plan based on user preferences and calculated targets
    const { dailyCalories, protein, carbs, fat } = nutritionTargets;

    // Select meals based on dietary preferences
    let breakfast: Meal[];
    let lunch: Meal[];
    let dinner: Meal[];
    let snacks: Meal[];

    if (userData.diet === 'vegetarian') {
      breakfast = vegetarianMeals.filter(meal => meal.type === 'breakfast');
      lunch = vegetarianMeals.filter(meal => meal.type === 'lunch');
      dinner = vegetarianMeals.filter(meal => meal.type === 'dinner');
      snacks = vegetarianMeals.filter(meal => meal.type === 'snack');
    } else {
      breakfast = sampleMeals.filter(meal => meal.type === 'breakfast');
      lunch = sampleMeals.filter(meal => meal.type === 'lunch');
      dinner = sampleMeals.filter(meal => meal.type === 'dinner');
      snacks = sampleMeals.filter(meal => meal.type === 'snack');
    }

    // Randomly select meals for the current day
    const getRandomMeal = (meals: Meal[]) => {
      const randomIndex = Math.floor(Math.random() * meals.length);
      return meals[randomIndex];
    };

    const todayBreakfast = getRandomMeal(breakfast);
    const todayLunch = getRandomMeal(lunch);
    const todayDinner = getRandomMeal(dinner);
    const todaySnack = getRandomMeal(snacks);

    const todayMeals = [todayBreakfast, todayLunch, todayDinner, todaySnack];

    // Generate weekly meal plan
    const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
    const weeklyPlan: { [key: string]: Meal[] } = {};

    days.forEach(day => {
      if (day === 'Sunday') {
        // Sunday gets special meals
        if (userData.diet === 'vegetarian') {
          const sundayVegBreakfast = vegetarianSundayMeals.find(meal => meal.type === 'breakfast') || getRandomMeal(breakfast);
          const sundayVegLunch = vegetarianSundayMeals.find(meal => meal.type === 'lunch') || getRandomMeal(lunch);
          const sundayVegDinner = vegetarianSundayMeals.find(meal => meal.type === 'dinner') || getRandomMeal(dinner);
          const sundayVegSnack = getRandomMeal(snacks);
          
          weeklyPlan[day] = [sundayVegBreakfast, sundayVegLunch, sundayVegDinner, sundayVegSnack];
        } else {
          const sundayBreakfast = sundayMeals.find(meal => meal.type === 'breakfast' && meal.id === 'sb1') || getRandomMeal(breakfast);
          const sundayLunch = sundayMeals.find(meal => meal.type === 'lunch' && meal.id === 'sl1') || getRandomMeal(lunch);
          const sundayDinner = sundayMeals.find(meal => meal.type === 'dinner' && meal.id === 'sd1') || getRandomMeal(dinner);
          const sundaySnack = sundayMeals.find(meal => meal.type === 'snack' && meal.id === 'ss1') || getRandomMeal(snacks);
          
          weeklyPlan[day] = [sundayBreakfast, sundayLunch, sundayDinner, sundaySnack];
        }
      } else {
        weeklyPlan[day] = [
          getRandomMeal(breakfast),
          getRandomMeal(lunch),
          getRandomMeal(dinner),
          getRandomMeal(snacks)
        ];
      }
    });

    // Update meal plan state
    setMealPlan({
      meals: todayMeals,
      dailyCalories,
      macros: {
        protein,
        carbs,
        fat
      },
      weeklyPlan
    });
  }, [userData]);

  return mealPlan;
};
