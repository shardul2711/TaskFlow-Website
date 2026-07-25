import React from 'react';

const Avatar = ({ name = '', src = '', size = 'md', className = '' }) => {
  const getInitials = (fullName) => {
    if (!fullName) return '';
    const parts = fullName.trim().split(/\s+/);
    if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
    return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
  };

  const getBackgroundColor = (fullName) => {
    if (!fullName) return 'bg-slate-500';
    const charCodeSum = fullName.split('').reduce((sum, char) => sum + char.charCodeAt(0), 0);
    const colors = [
      'bg-red-500 text-white',
      'bg-orange-500 text-white',
      'bg-amber-500 text-white',
      'bg-emerald-500 text-white',
      'bg-teal-500 text-white',
      'bg-blue-500 text-white',
      'bg-indigo-500 text-white',
      'bg-purple-500 text-white',
      'bg-pink-500 text-white',
    ];
    return colors[charCodeSum % colors.length];
  };

  const sizes = {
    xs: 'h-6 w-6 text-[10px]',
    sm: 'h-8 w-8 text-xs',
    md: 'h-10 w-10 text-sm font-semibold',
    lg: 'h-14 w-14 text-lg font-bold',
    xl: 'h-24 w-24 text-3xl font-bold',
  };

  const bgStyle = getBackgroundColor(name);

  return (
    <div
      className={`relative inline-flex items-center justify-center rounded-full overflow-hidden shrink-0 select-none ${sizes[size]} ${className}`}
    >
      {src ? (
        <img
          src={src}
          alt={name}
          className="h-full w-full object-cover"
          onError={(e) => {
            e.target.style.display = 'none'; // Fallback to initials if image fails to load
          }}
        />
      ) : null}
      {/* Fallback to Initials */}
      <span className={`absolute inset-0 flex items-center justify-center ${bgStyle}`}>
        {getInitials(name)}
      </span>
    </div>
  );
};

export default React.memo(Avatar);
