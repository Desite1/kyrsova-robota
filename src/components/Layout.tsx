
import React from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

interface LayoutProps {
  children: React.ReactNode;
  hideBackButton?: boolean;
  title?: string;
  className?: string;
}

const Layout: React.FC<LayoutProps> = ({ 
  children, 
  hideBackButton = false, 
  title,
  className = ""
}) => {
  const navigate = useNavigate();
  
  return (
    <div className={`min-h-[100dvh] flex flex-col w-full px-5 py-6 ${className}`}>
      <header className="mb-6 flex items-center justify-between">
        {!hideBackButton && (
          <button 
            onClick={() => navigate(-1)}
            className="w-10 h-10 flex items-center justify-center rounded-full bg-background hover:bg-secondary transition-colors"
            aria-label="Go back"
          >
            <ArrowLeft size={20} className="text-muted-foreground" />
          </button>
        )}
        {title && (
          <h1 className="text-xl font-semibold text-balance text-center flex-1">
            {title}
          </h1>
        )}
        {!hideBackButton && <div className="w-10" />}
      </header>
      <main className="flex-1 flex flex-col">
        {children}
      </main>
    </div>
  );
};

export default Layout;
