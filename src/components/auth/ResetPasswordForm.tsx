import React, { useState } from 'react';
import { Lock, Eye, EyeOff } from 'lucide-react';
import { toast } from 'sonner';
import Input from '../ui/Input';
import Button from '../ui/Button';
import { ResetPasswordFormData, ResetPasswordFormErrors } from '../../types/auth';
import { validatePassword, validateConfirmPassword } from '../../utils/validators';

interface ResetPasswordFormProps {
  onSubmit: (data: ResetPasswordFormData) => void;
  isLoading?: boolean;
}

const ResetPasswordForm: React.FC<ResetPasswordFormProps> = ({ onSubmit, isLoading = false }) => {
  const [formData, setFormData] = useState<ResetPasswordFormData>({
    password: '',
    confirmPassword: '',
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errors, setErrors] = useState<ResetPasswordFormErrors>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));

    if (errors[name as keyof ResetPasswordFormErrors]) {
      setErrors(prev => ({ ...prev, [name]: undefined }));
    }
  };

  const validate = (): boolean => {
    const newErrors: ResetPasswordFormErrors = {};

    const passwordError = validatePassword(formData.password);
    if (passwordError) newErrors.password = passwordError;

    const confirmPasswordError = validateConfirmPassword(formData.password, formData.confirmPassword);
    if (confirmPasswordError) newErrors.confirmPassword = confirmPasswordError;

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (validate()) {
      try {
        await onSubmit(formData);
      } catch (error) {
        toast.error(`Failed to reset password ${error}`);
      }
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <Input
        label="New Password"
        type={showPassword ? 'text' : 'password'}
        name="password"
        id="password"
        placeholder="Enter your new password"
        icon={Lock}
        value={formData.password}
        onChange={handleChange}
        error={errors.password}
        required
        autoComplete="new-password"
        rightIcon={
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="text-gray-400 hover:text-gray-500 focus:outline-none"
          >
            {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
          </button>
        }
      />

      <Input
        label="Confirm New Password"
        type={showConfirmPassword ? 'text' : 'password'}
        name="confirmPassword"
        id="confirmPassword"
        placeholder="Confirm your new password"
        icon={Lock}
        value={formData.confirmPassword}
        onChange={handleChange}
        error={errors.confirmPassword}
        required
        autoComplete="new-password"
        rightIcon={
          <button
            type="button"
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            className="text-gray-400 hover:text-gray-500 focus:outline-none"
          >
            {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
          </button>
        }
      />

      <Button
        type="submit"
        className="w-full py-3 text-base font-semibold"
        isLoading={isLoading}
      >
        Reset Password
      </Button>
    </form>
  );
};

export default ResetPasswordForm;