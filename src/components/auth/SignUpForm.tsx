import React, { useState } from 'react';
import { Mail, Lock, Eye, EyeOff, User } from 'lucide-react';
import { toast } from 'sonner';
import Input from '../ui/Input';
import Button from '../ui/Button';
import Checkbox from '../ui/Checkbox';
import { SignUpFormData, SignUpFormErrors } from '../../types/auth';
import { validateEmail, validatePassword, validateName, validateConfirmPassword } from '../../utils/validators';

interface SignUpFormProps {
  onSubmit: (data: SignUpFormData) => void;
  isLoading?: boolean;
}

const SignUpForm: React.FC<SignUpFormProps> = ({ onSubmit, isLoading = false }) => {
  const [formData, setFormData] = useState<SignUpFormData>({
    firstName: '',
    middleName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    acceptTerms: false,
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errors, setErrors] = useState<SignUpFormErrors>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));

    if (errors[name as keyof SignUpFormErrors]) {
      setErrors(prev => ({ ...prev, [name]: undefined }));
    }
  };

  const validate = (): boolean => {
    const newErrors: SignUpFormErrors = {};

    const firstNameError = validateName(formData.firstName, 'First name');
    if (firstNameError) newErrors.firstName = firstNameError;

    const middleNameError = validateName(formData.middleName, 'Middle name', false);
    if (middleNameError) newErrors.middleName = middleNameError;

    const lastNameError = validateName(formData.lastName, 'Last name');
    if (lastNameError) newErrors.lastName = lastNameError;

    const emailError = validateEmail(formData.email);
    if (emailError) newErrors.email = emailError;

    const passwordError = validatePassword(formData.password);
    if (passwordError) newErrors.password = passwordError;

    const confirmPasswordError = validateConfirmPassword(formData.password, formData.confirmPassword);
    if (confirmPasswordError) newErrors.confirmPassword = confirmPasswordError;

    if (!formData.acceptTerms) {
      newErrors.acceptTerms = 'You must accept the terms and conditions';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (validate()) {
      try {
        await onSubmit(formData);
      } catch (error) {
        toast.error(`Failed to create account ${error}`);
      }
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <Input
        label="First Name"
        type="text"
        name="firstName"
        id="firstName"
        placeholder="John"
        icon={User}
        value={formData.firstName}
        onChange={handleChange}
        error={errors.firstName}
        required
        autoComplete="given-name"
      />

      <Input
        label="Middle Name"
        type="text"
        name="middleName"
        id="middleName"
        placeholder="(Optional)"
        icon={User}
        value={formData.middleName}
        onChange={handleChange}
        error={errors.middleName}
        autoComplete="additional-name"
      />

      <Input
        label="Last Name"
        type="text"
        name="lastName"
        id="lastName"
        placeholder="Doe"
        icon={User}
        value={formData.lastName}
        onChange={handleChange}
        error={errors.lastName}
        required
        autoComplete="family-name"
      />

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

      <Input
        label="Password"
        type={showPassword ? 'text' : 'password'}
        name="password"
        id="password"
        placeholder="Create a strong password"
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
        label="Confirm Password"
        type={showConfirmPassword ? 'text' : 'password'}
        name="confirmPassword"
        id="confirmPassword"
        placeholder="Confirm your password"
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

      <div className="space-y-2">
        <Checkbox
          id="acceptTerms"
          name="acceptTerms"
          checked={formData.acceptTerms}
          onCheckedChange={(checked) =>
            setFormData(prev => ({ ...prev, acceptTerms: checked === true }))
          }
          label={
            <span className="text-sm text-gray-600">
              I agree to the{' '}
              <a href="/terms" className="text-primary-600 hover:text-primary-500">
                Terms of Service
              </a>
              {' '}and{' '}
              <a href="/privacy" className="text-primary-600 hover:text-primary-500">
                Privacy Policy
              </a>
            </span>
          }
        />
        {errors.acceptTerms && (
          <p className="text-sm text-red-600">{errors.acceptTerms}</p>
        )}
      </div>

      <Button
        type="submit"
        className="w-full py-3 text-base font-semibold"
        isLoading={isLoading}
      >
        Create Account
      </Button>
    </form>
  );
};

export default SignUpForm;