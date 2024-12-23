import React from 'react';
import { ExclamationTriangleIcon, CheckCircleIcon, InformationCircleIcon } from '@heroicons/react/20/solid';

const iconTypes = {
  error: ExclamationTriangleIcon,
  success: CheckCircleIcon,
  info: InformationCircleIcon,
};

const colorTypes = {
  error: {
    bgColor: 'bg-red-50',
    borderColor: 'border-red-400',
    textColor: 'text-red-700',
    linkColor: 'text-red-700',
    hoverLinkColor: 'hover:text-red-600',
  },
  success: {
    bgColor: 'bg-green-50',
    borderColor: 'border-green-400',
    textColor: 'text-green-700',
    linkColor: 'text-green-700',
    hoverLinkColor: 'hover:text-green-600',
  },
  info: {
    bgColor: 'bg-blue-50',
    borderColor: 'border-blue-400',
    textColor: 'text-blue-700',
    linkColor: 'text-blue-700',
    hoverLinkColor: 'hover:text-blue-600',
  },
};

const Alert = ({ type = 'info', message, linkText, linkHref }) => {
  const Icon = iconTypes[type];
  const { bgColor, borderColor, textColor, linkColor, hoverLinkColor } = colorTypes[type];

  return (
    <div className={`border-l-4 ${borderColor} ${bgColor} p-4`}>
      <div className="flex">
        <div className="flex-shrink-0">
          <Icon className={`h-5 w-5 ${textColor}`} aria-hidden="true" />
        </div>
        <div className="ml-3">
          <p className={`text-sm ${textColor}`}>
            {message}{' '}
            {linkText && linkHref && (
              <a href={linkHref} className={`font-medium underline ${linkColor} ${hoverLinkColor}`}>
                {linkText}
              </a>
            )}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Alert;