
import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/Button";
import Layout from "@/components/Layout";

const Index = () => {
  const navigate = useNavigate();

  return (
    <Layout hideBackButton className="items-center justify-center px-6">
      <div className="w-full max-w-md mx-auto flex flex-col items-center">
        <div className="flex flex-col items-center mb-12 animate-fade-in">
          <div className="h-24 w-24 rounded-full bg-accent/10 flex items-center justify-center mb-6">
            <div className="h-16 w-16 rounded-full bg-accent/20 flex items-center justify-center">
              <div className="h-10 w-10 rounded-full bg-accent flex items-center justify-center text-white font-bold">
                МП
              </div>
            </div>
          </div>
          <h1 className="text-4xl font-bold mb-3 text-center">Meal Plan Pro</h1>
          <p className="text-muted-foreground text-center mb-6 max-w-xs">
            Ваш персональний помічник з планування харчування для досягнення цілей фітнесу
          </p>
        </div>

        <div className="w-full max-w-xs space-y-4 animate-fade-in" style={{ animationDelay: "200ms" }}>
          <Button 
            variant="accent" 
            size="full"
            className="font-medium"
            onClick={() => navigate("/onboarding")}
          >
            Почати
          </Button>
          
          <div className="text-center mt-8">
            <p className="text-sm text-muted-foreground">
              Вже маєте профіль? <br />
              Функція входу скоро з'явиться.
            </p>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Index;
