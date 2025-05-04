
import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="text-center p-s9 max-w-md">
        <h1 className="text-t9 font-bold text-primary mb-s4">404</h1>
        <p className="text-t5 text-gray-600 mb-s6">
          Oops! The page you're looking for doesn't exist.
        </p>
        <Link 
          to="/" 
          className="inline-block px-s6 py-s3 bg-primary text-white rounded-m hover:bg-primary-600"
        >
          Return to Dashboard
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
