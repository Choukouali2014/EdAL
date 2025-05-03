import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Toaster } from 'sonner';
import { Flame } from 'lucide-react';
import SignUpForm from '../components/auth/SignUpForm';
import SocialLoginButtons from '../components/auth/SocialLoginButtons';
import { SignUpFormData } from '../types/auth';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { setDoc, doc } from 'firebase/firestore';
import { auth, db } from '../utils/firebase';

const SignUpPage: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSignUp = async (data: SignUpFormData) => {
    setIsLoading(true);

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, data.email, data.password);

      const user = userCredential.user;

      await setDoc(doc(db, 'users', user.uid), {
        firstName: data.firstName,
        middleName: data.middleName,
        lastName: data.lastName,
        email: data.email,
        createdAt: new Date(),
        acceptTerms: data.acceptTerms,
      });

      navigate('/dashboard');
    } finally {
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
          <h2 className="text-2xl font-bold text-gray-900">Create Your Account</h2>
          <p className="mt-2 text-center text-gray-600">
            Join EdAL and start your learning journey
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-card p-8">
          <SignUpForm onSubmit={handleSignUp} isLoading={isLoading} />
          <SocialLoginButtons />

          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
              Already have an account?{' '}
              <a href="/login" className="font-medium text-primary-600 hover:text-primary-500">
                Log in
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

export default SignUpPage;