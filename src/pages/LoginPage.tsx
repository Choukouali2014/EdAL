import React, { useState } from 'react';
import { Toaster } from 'sonner';
import { Flame } from 'lucide-react';
import LoginForm from '../components/auth/LoginForm';
import SocialLoginButtons from '../components/auth/SocialLoginButtons';
import { LoginFormData } from '../types/auth';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../utils/firebase';
import { useNavigate } from 'react-router-dom';

const LoginPage: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();


  const handleLogin = async (data: LoginFormData) => {
    setIsLoading(true);

    try {

      await signInWithEmailAndPassword(auth, data.email, data.password);

      navigate('/dashboard');

    } catch (e) {
      throw new Error(`Invalid credentials ${e}`);
    }
    finally {
      setIsLoading(false);
    }
  };



  return (
    <div className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      <Toaster position="top-center" />

      <div className="absolute inset-0 gradient-background" />

      <div className="z-10 w-full max-w-md">
        <div className="flex flex-col items-center mb-8">
          <div className="flex items-center mb-2">
            <Flame className="text-primary-600 h-10 w-10 mr-2" />
            <h1 className="text-4xl font-bold text-primary-600">EdAL</h1>
          </div>
          <h2 className="text-2xl font-bold text-gray-900">Welcome Back to EdAL</h2>
          <p className="mt-2 text-center text-gray-600">
            Log in to continue your learning
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-card p-8">
          <LoginForm onSubmit={handleLogin} isLoading={isLoading} />
          <SocialLoginButtons />

          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
              Don't have an account?{' '}
              <a href="/register" className="font-medium text-primary-600 hover:text-primary-500">
                Sign up
              </a>
            </p>
          </div>
        </div>

        <footer className="mt-8 text-center text-sm text-gray-500">
          © 2025 EdAL. All rights reserved.
        </footer>
      </div>
    </div>
  );
};

export default LoginPage;