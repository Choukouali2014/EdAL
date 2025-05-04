import React, { useState } from 'react';
import { Mail } from 'lucide-react';
import { toast } from 'sonner';
import Input from '../ui/Input';
import Button from '../ui/Button';
import { ForgotPasswordFormData, ForgotPasswordFormErrors } from '../../types/auth';
import { validateEmail } from '../../utils/validators';

interface ForgotPasswordFormProps {
    onSubmit: (data: ForgotPasswordFormData) => void;
    isLoading?: boolean;
}

const ForgotPasswordForm: React.FC<ForgotPasswordFormProps> = ({ onSubmit, isLoading = false }) => {
    const [formData, setFormData] = useState<ForgotPasswordFormData>({
        email: '',
    });

    const [errors, setErrors] = useState<ForgotPasswordFormErrors>({});

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value,
        }));

        if (errors[name as keyof ForgotPasswordFormErrors]) {
            setErrors(prev => ({ ...prev, [name]: undefined }));
        }
    };

    const validate = (): boolean => {
        const newErrors: ForgotPasswordFormErrors = {};

        const emailError = validateEmail(formData.email);
        if (emailError) newErrors.email = emailError;

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (validate()) {
            try {
                await onSubmit(formData);
                setFormData({ email: '' });
            } catch (error) {
                toast.error(`Failed to send reset email ${error}`);
            }
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            <Input
                label="Email"
                type="email"
                name="email"
                id="email"
                placeholder="you@example.com"
                icon={Mail}
                value={formData.email}
                onChange={handleChange}
                error={errors.email}
                required
                autoComplete="email"
            />

            <Button
                type="submit"
                className="w-full py-3 text-base font-semibold"
                isLoading={isLoading}
            >
                Send Reset Link
            </Button>

            <p className="text-sm text-center text-gray-600">
                Remember your password?{' '}
                <a href="/" className="font-medium text-primary-600 hover:text-primary-500">
                    Back to login
                </a>
            </p>
        </form>
    );
};

export default ForgotPasswordForm;