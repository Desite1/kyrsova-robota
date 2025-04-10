
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/Button";
import OnboardingLayout from "@/components/OnboardingLayout";
import { UserProfileData } from "@/components/UserProfile";

const Onboarding = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<Partial<UserProfileData>>({
    age: undefined,
    gender: undefined,
    weight: undefined,
    height: undefined,
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    const numValue = name === 'age' || name === 'weight' || name === 'height' 
      ? Number(value) 
      : value;
    
    setFormData({
      ...formData,
      [name]: numValue,
    });
    
    // Clear error for this field if it exists
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: '',
      });
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.age) {
      newErrors.age = 'Вік обов\'язковий';
    } else if (formData.age < 18 || formData.age > 100) {
      newErrors.age = 'Вік має бути від 18 до 100 років';
    }
    
    if (!formData.gender) {
      newErrors.gender = 'Стать обов\'язкова';
    }
    
    if (!formData.weight) {
      newErrors.weight = 'Вага обов\'язкова';
    } else if (formData.weight < 30 || formData.weight > 300) {
      newErrors.weight = 'Вага має бути від 30 до 300 кг';
    }
    
    if (!formData.height) {
      newErrors.height = 'Зріст обов\'язковий';
    } else if (formData.height < 100 || formData.height > 250) {
      newErrors.height = 'Зріст має бути від 100 до 250 см';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
      // Store form data in localStorage for persistence
      localStorage.setItem('userProfileData', JSON.stringify(formData));
      navigate('/goal');
    }
  };

  return (
    <OnboardingLayout 
      title="Давайте почнемо"
      description="Розкажіть нам трохи про себе, щоб ми створили персоналізований план харчування"
    >
      <form onSubmit={handleSubmit} className="flex flex-col flex-1">
        <div className="flex-1 grid gap-6 animate-fade-in" style={{ animationDelay: "100ms" }}>
          <div>
            <label htmlFor="age" className="block text-sm font-medium mb-2">
              Вік
            </label>
            <input
              type="number"
              id="age"
              name="age"
              value={formData.age || ''}
              onChange={handleInputChange}
              className={`w-full h-12 px-4 rounded-md border ${
                errors.age ? 'border-destructive' : 'border-input'
              } bg-background focus:outline-none focus:ring-2 focus:ring-accent`}
              placeholder="Введіть ваш вік"
            />
            {errors.age && <p className="text-destructive text-sm mt-1">{errors.age}</p>}
          </div>
          
          <div>
            <label htmlFor="gender" className="block text-sm font-medium mb-2">
              Стать
            </label>
            <select
              id="gender"
              name="gender"
              value={formData.gender || ''}
              onChange={handleInputChange}
              className={`w-full h-12 px-4 rounded-md border ${
                errors.gender ? 'border-destructive' : 'border-input'
              } bg-background focus:outline-none focus:ring-2 focus:ring-accent`}
            >
              <option value="" disabled>Оберіть вашу стать</option>
              <option value="male">Чоловіча</option>
              <option value="female">Жіноча</option>
              <option value="other">Інше</option>
            </select>
            {errors.gender && <p className="text-destructive text-sm mt-1">{errors.gender}</p>}
          </div>
          
          <div>
            <label htmlFor="weight" className="block text-sm font-medium mb-2">
              Вага (кг)
            </label>
            <input
              type="number"
              id="weight"
              name="weight"
              value={formData.weight || ''}
              onChange={handleInputChange}
              className={`w-full h-12 px-4 rounded-md border ${
                errors.weight ? 'border-destructive' : 'border-input'
              } bg-background focus:outline-none focus:ring-2 focus:ring-accent`}
              placeholder="Введіть вашу вагу в кг"
              step="0.1"
            />
            {errors.weight && <p className="text-destructive text-sm mt-1">{errors.weight}</p>}
          </div>
          
          <div>
            <label htmlFor="height" className="block text-sm font-medium mb-2">
              Зріст (см)
            </label>
            <input
              type="number"
              id="height"
              name="height"
              value={formData.height || ''}
              onChange={handleInputChange}
              className={`w-full h-12 px-4 rounded-md border ${
                errors.height ? 'border-destructive' : 'border-input'
              } bg-background focus:outline-none focus:ring-2 focus:ring-accent`}
              placeholder="Введіть ваш зріст в см"
            />
            {errors.height && <p className="text-destructive text-sm mt-1">{errors.height}</p>}
          </div>
        </div>
        
        <div className="mt-8 animate-fade-in" style={{ animationDelay: "200ms" }}>
          <Button type="submit" variant="accent" size="full">
            Продовжити
          </Button>
        </div>
      </form>
    </OnboardingLayout>
  );
};

export default Onboarding;
