import React from 'react';
import { Flame } from 'lucide-react';

interface LogoProps {
  size?: 'sm' | 'md' | 'lg';
}

const Logo: React.FC<LogoProps> = ({ size = 'md' }) => {
  const sizeClasses = {
    sm: 'text-xl',
    md: 'text-2xl',
    lg: 'text-4xl',
  };

  return (
    <div className="flex flex-col items-center">
      <div className="flex items-center">
        <Flame className="text-amber-600 mr-2 h-8 w-8" />
        <h1 className={`font-bold text-amber-600 ${sizeClasses[size]}`}>EdAL</h1>
      </div>
      <p className="text-sm text-gray-600 mt-1">Education Re-imagined</p>
    </div>
  );
};

export default Logo;