
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "@/components/ui/sonner";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("manager"); // Default role
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simple validation
    if (!email || !password) {
      toast.error("Please fill in all fields");
      setIsLoading(false);
      return;
    }

    // Mock authentication - in a real app, this would call an API
    setTimeout(() => {
      // Store user info in sessionStorage (this is just for demo purposes)
      sessionStorage.setItem(
        "user", 
        JSON.stringify({ email, role, name: email.split('@')[0] })
      );
      
      toast.success(`Logged in as ${role}`);
      navigate("/dashboard");
      setIsLoading(false);
    }, 800);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-s4">
      <div className="w-full max-w-md">
        <div className="text-center mb-s8">
          <h1 className="text-t7 font-bold text-primary mb-s2">Stock Savvy</h1>
          <p className="text-t4 text-gray-600">Inventory Management System</p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="text-t6">Login</CardTitle>
            <CardDescription>Enter your credentials to access the system</CardDescription>
          </CardHeader>
          <form onSubmit={handleSubmit}>
            <CardContent className="space-y-s5">
              <div className="space-y-s3">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="your.email@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="space-y-s3">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              <div className="space-y-s3">
                <Label htmlFor="role">Role</Label>
                <div className="grid grid-cols-2 gap-s4">
                  <div 
                    className={`border rounded-m p-s3 text-center cursor-pointer transition-colors ${role === 'manager' 
                      ? 'bg-primary-100 border-primary text-primary-600' 
                      : 'hover:bg-gray-50'}`}
                    onClick={() => setRole('manager')}
                  >
                    Manager
                  </div>
                  <div 
                    className={`border rounded-m p-s3 text-center cursor-pointer transition-colors ${role === 'receptionist' 
                      ? 'bg-primary-100 border-primary text-primary-600' 
                      : 'hover:bg-gray-50'}`}
                    onClick={() => setRole('receptionist')}
                  >
                    Receptionist
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button 
                className="w-full" 
                type="submit" 
                disabled={isLoading}
              >
                {isLoading ? "Logging in..." : "Login"}
              </Button>
            </CardFooter>
          </form>
        </Card>
      </div>
    </div>
  );
};

export default Login;
