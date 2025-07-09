import React from 'react';
import * as LucideIcons from 'lucide-react';
import { AlertTriangle } from 'lucide-react';

const SafeIcon = ({ icon, name, ...props }) => {
  let IconComponent;
  
  try {
    if (icon) {
      IconComponent = icon;
    } else if (name && LucideIcons[name]) {
      IconComponent = LucideIcons[name];
    }
  } catch (e) {
    IconComponent = null;
  }

  if (IconComponent) {
    // If IconComponent is a React element, clone it with props
    if (React.isValidElement(IconComponent)) {
      return React.cloneElement(IconComponent, props);
    }
    // If IconComponent is a component function, render it with props
    return <IconComponent {...props} />;
  }
  
  return <AlertTriangle {...props} />;
};

export default SafeIcon;