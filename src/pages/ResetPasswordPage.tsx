import React, { useState } from 'react';
import { Toaster, toast } from 'sonner';
import { Flame } from 'lucide-react';
import ResetPasswordForm from '../components/auth/ResetPasswordForm';
import { ResetPasswordFormData } from '../types/auth';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { confirmPasswordReset } from 'firebase/auth';
import { auth } from '../utils/firebase';

const ResetPasswordPage: React.FC = () => {
    const [searchParams] = useSearchParams();
    const [isLoading, setIsLoading] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const navigate = useNavigate();

    const oobCode = searchParams.get('oobCode');

    const handleResetPassword = async (data: ResetPasswordFormData) => {
        setIsLoading(true);

        if (!oobCode) {
            setIsLoading(false);
            toast.error('Invalid reset link.');
            return;
        }

        try {
            await confirmPasswordReset(auth, oobCode, data.password);
            setIsSuccess(true);
            
            toast.success('Password reset successfully');
            navigate('/login');

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
                        {isSuccess
                            ? "Your password has been reset successfully. Redirecting to login..."
                            : "Enter your new password below"}
                    </p>
                </div>

                <div className="bg-white rounded-2xl shadow-card p-8">
                    {isSuccess ? (
                        <div className="text-center space-y-4">
                            <p className="text-gray-600">
                                You can now log in with your new password.
                            </p>
                        </div>
                    ) : (
                        <ResetPasswordForm
                            onSubmit={handleResetPassword}
                            isLoading={isLoading}
                        />
                    )}
                </div>

                <footer className="mt-8 text-center text-sm text-gray-500">
                    © 2025 EdAL. All rights reserved.
                </footer>
            </div>
        </div>
    );
};

export default ResetPasswordPage;