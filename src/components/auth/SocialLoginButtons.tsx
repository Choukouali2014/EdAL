import React, { useState } from 'react';
import Button from '../ui/Button';
import { useNavigate } from 'react-router-dom';
import { getAdditionalUserInfo, signInWithPopup } from 'firebase/auth';
import { googleProvider, microsoftProvider, appleProvider, auth, db } from '../../utils/firebase';
import { setDoc, doc } from 'firebase/firestore';

const SocialLoginButtons: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSocialLogin = async (provider: 'google' | 'microsoft' | 'apple') => {
    setIsLoading(true);
    try {
      let selectedProvider;
      switch (provider) {
        case 'google':
          selectedProvider = googleProvider;
          break;
        case 'microsoft':
          selectedProvider = microsoftProvider;
          break;
        case 'apple':
          selectedProvider = appleProvider;
          break;
        default:
          throw new Error('Unsupported provider');
      }

      const result = await signInWithPopup(auth, selectedProvider);

      const user = result.user;
      const additionalInfo = getAdditionalUserInfo(result);
      if (additionalInfo?.isNewUser) {
        await setDoc(doc(db, 'users', user.uid), {
          firstName: user.displayName,
          middleName: '',
          lastName: '',
          email: user.email,
          createdAt: new Date(),
          acceptTerms: false,
        });
      }

      navigate('/dashboard');

    } catch (error) {
      alert('Social login failed: ' + error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="mt-6">
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-gray-300"></div>
        </div>
        <div className="relative flex justify-center text-sm">
          <span className="px-2 bg-white text-gray-500">Or sign in with</span>
        </div>
      </div>

      <div className="mt-6 space-y-3">
        <Button
          variant="outline"
          className="w-full justify-center"
          onClick={() => handleSocialLogin('google')}
          disabled={isLoading}
        >
          <img
            src="https://www.google.com/favicon.ico"
            alt="Google"
            className="w-5 h-5 mr-2"
          />
          Sign in with Google
        </Button>

        <Button
          variant="outline"
          className="w-full justify-center"
          onClick={() => handleSocialLogin('apple')}
          disabled={isLoading}
        >
          <img
            src="https://www.apple.com/favicon.ico"
            alt="Apple"
            className="w-5 h-5 mr-2"
          />
          Sign in with Apple
        </Button>

        <Button
          variant="outline"
          className="w-full justify-center"
          onClick={() => handleSocialLogin('microsoft')}
          disabled={isLoading}
        >
          <img
            src="https://www.microsoft.com/favicon.ico"
            alt="Microsoft"
            className="w-5 h-5 mr-2"
          />
          Sign in with Microsoft
        </Button>
      </div>
    </div>
  );
};

export default SocialLoginButtons;

