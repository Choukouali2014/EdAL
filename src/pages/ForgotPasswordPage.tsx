import React, { useState } from 'react';
import { Toaster, toast } from 'sonner';
import { Flame } from 'lucide-react';
import ForgotPasswordForm from '../components/auth/ForgotPasswordForm';
import { ForgotPasswordFormData } from '../types/auth';

import { auth } from '../utils/firebase';
import { sendPasswordResetEmail } from 'firebase/auth';

const ForgotPasswordPage: React.FC = () => {
    const [isLoading, setIsLoading] = useState(false);


    const handleForgotPassword = async (data: ForgotPasswordFormData) => {
        setIsLoading(true);

        try {
            await sendPasswordResetEmail(auth, data.email, {
               url: 'https://login-7d4cd.web.app/reset-password',
               handleCodeInApp: true,
            });

            toast.success('Reset link sent to your email');

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
                    <h2 className="text-2xl font-bold text-gray-900">Reset Your Password</h2>
                    <p className="mt-2 text-center text-gray-600">
                        Enter your email and we'll send you instructions to reset your password
                    </p>
                </div>

                <div className="bg-white rounded-2xl shadow-card p-8">
                    <ForgotPasswordForm
                        onSubmit={handleForgotPassword}
                        isLoading={isLoading}
                    />
                </div>

                <footer className="mt-8 text-center text-sm text-gray-500">
                    © 2025 EdAL. All rights reserved.
                </footer>
            </div>
        </div>
    );
};

export default ForgotPasswordPage;