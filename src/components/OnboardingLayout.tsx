
import React from "react";
import { useLocation } from "react-router-dom";
import ProgressBar from "./ProgressBar";

interface OnboardingLayoutProps {
  children: React.ReactNode;
  title: string;
  description?: string;
}

const OnboardingLayout: React.FC<OnboardingLayoutProps> = ({ 
  children, 
  title,
  description
}) => {
  const location = useLocation();
  const pathsInOrder = ['/onboarding', '/goal', '/diet'];
  const currentStepIndex = pathsInOrder.indexOf(location.pathname);
  const progress = currentStepIndex >= 0 
    ? ((currentStepIndex + 1) / pathsInOrder.length) * 100 
    : 0;
  
  return (
    <div className="min-h-[100dvh] flex flex-col w-full pb-8">
      <div className="w-full">
        <ProgressBar value={progress} />
      </div>
      <div className="flex-1 flex flex-col px-6 pt-12">
        <header className="mb-8 animate-fade-in">
          <h1 className="text-3xl font-semibold mb-3 tracking-tight text-balance">{title}</h1>
          {description && (
            <p className="text-muted-foreground text-balance">{description}</p>
          )}
        </header>
        <main className="flex-1 flex flex-col">
          {children}
        </main>
      </div>
    </div>
  );
};

export default OnboardingLayout;
