
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/Button";
import Layout from "@/components/Layout";
import { Dumbbell } from "lucide-react";

const NotFound = () => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    console.error(
      "404 Помилка: Користувач намагався отримати доступ до неіснуючого маршруту:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <Layout hideBackButton className="items-center justify-center">
      <div className="text-center animate-fade-in">
        <div className="inline-flex h-20 w-20 items-center justify-center rounded-full bg-accent/20 mb-6">
          <Dumbbell size={32} className="text-accent" />
        </div>
        <h1 className="text-4xl font-bold mb-4">404</h1>
        <p className="text-xl text-muted-foreground mb-8">
          Упс! Ця сторінка не знайдена
        </p>
        <Button 
          variant="accent" 
          onClick={() => navigate("/")}
          className="min-w-40"
        >
          На головну
        </Button>
      </div>
    </Layout>
  );
};

export default NotFound;
