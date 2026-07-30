import React, { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';
import { useLogin } from '../hooks/useLogin';
import { Card, CardBody, CardHeader } from '../components/ui/Card';
import { Input } from '../components/ui/Input';
import { Button } from '../components/ui/Button';

export const Login: React.FC = () => {
  const [showPassword, setShowPassword] = useState(false);
  const { register, handleSubmit, errors, error, loading } = useLogin();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full">
        <Card>
          <CardHeader>
            <h2 className="text-center text-3xl font-extrabold text-gray-900">
              Menu CR Tracker
            </h2>
            <p className="mt-2 text-center text-sm text-gray-600">
              Sign in to your account
            </p>
          </CardHeader>
          <CardBody>
            <form onSubmit={handleSubmit} className="space-y-6">
              {error && (
                <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-md text-sm">
                  {error}
                </div>
              )}
              
              <Input
                label="Email Address"
                type="email"
                {...register('email')}
                error={errors.email?.message}
              />
              
              <Input
                label="Password"
                type={showPassword ? 'text' : 'password'}
                {...register('password')}
                error={errors.password?.message}
                rightIcon={
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="text-gray-400 hover:text-gray-600 focus:outline-none flex items-center justify-center h-full w-full"
                    tabIndex={-1}
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                }
              />
              
              <Button type="submit" className="w-full" disabled={loading}>
                {loading ? 'Signing in...' : 'Sign in'}
              </Button>
            </form>
            
            <div className="mt-6 border-t border-gray-200 pt-4">
              <p className="text-xs text-gray-500 text-center">
                Demo Accounts:<br/>
                manager@sapphire.com / password123<br/>
                supervisor@sapphire.com / password123
              </p>
            </div>
          </CardBody>
        </Card>
      </div>
    </div>
  );
};
