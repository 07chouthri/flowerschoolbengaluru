import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import api, { endpoints } from '@/lib/api';

export function SignInForm() {
  const [email, setEmail] = useState(() => localStorage.getItem('signin_email') || '');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  // Save email to localStorage whenever it changes
  useEffect(() => {
    if (email) {
      localStorage.setItem('signin_email', email);
    }
  }, [email]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await api.post(endpoints.login, { email, password });
      localStorage.setItem('sessionToken', response.data.sessionToken);
      // Update admin status immediately
      const userResponse = await api.get('/api/auth/user');
      const isAdmin = userResponse.data.role === 'admin';
      if (isAdmin) {
        localStorage.setItem('isAdmin', 'true');
      }
      
      toast({
        title: "Success!",
        description: "You've successfully signed in.",
      });
      
      // Clear stored email after successful login
      localStorage.removeItem('signin_email');
      
      // If admin, redirect to admin page, otherwise home
      navigate(isAdmin ? '/admin' : '/');
    } catch (error) {
      toast({
        title: "Error",
        description: "Invalid email or password",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6 w-full max-w-md mx-auto">
      <div className="space-y-2 text-center">
        <h1 className="text-3xl font-bold">Welcome Back</h1>
        <p className="text-gray-500 dark:text-gray-400">
          Enter your credentials to sign in
        </p>
      </div>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            placeholder="you@example.com"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="password">Password</Label>
          <Input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <Button 
          type="submit" 
          className="w-full"
          disabled={isLoading}
        >
          {isLoading ? "Signing in..." : "Sign In"}
        </Button>
      </form>
      <div className="text-center space-y-2">
        <Button
          variant="link"
          className="text-sm text-primary"
          onClick={() => navigate('/forgot-password')}
        >
          Forgot your password?
        </Button>
        <div className="text-sm text-gray-500">
          Don't have an account?{" "}
          <Button
            variant="link"
            className="text-primary"
            onClick={() => navigate('/signup')}
          >
            Sign up
          </Button>
        </div>
      </div>
    </div>
  );
}