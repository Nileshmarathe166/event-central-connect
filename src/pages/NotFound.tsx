
import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Home } from "lucide-react";

const NotFound: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-aces-blue/10 to-aces-purple/10 p-6">
      <div className="text-center max-w-md">
        <h1 className="text-6xl font-bold text-aces-blue">404</h1>
        <p className="text-xl text-foreground mt-4 mb-6">
          Oops! We couldn't find the page you're looking for.
        </p>
        <p className="text-muted-foreground mb-8">
          The page at <code className="bg-muted p-1 rounded">{location.pathname}</code> doesn't exist or has been moved.
        </p>
        <Button 
          onClick={() => navigate('/dashboard')} 
          className="bg-aces-blue hover:bg-aces-purple"
        >
          <Home className="mr-2 h-4 w-4" />
          Return to Dashboard
        </Button>
      </div>
    </div>
  );
};

export default NotFound;
