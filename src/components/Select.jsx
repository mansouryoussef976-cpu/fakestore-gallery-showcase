import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';

const Select = ({ value, onValueChange, children, ...props }) => {
  const [isOpen, setIsOpen] = useState(false);
  
  return (
    <div className="relative">
      <SelectTrigger onClick={() => setIsOpen(!isOpen)} {...props}>
        <SelectValue value={value} />
        <ChevronDown className="h-4 w-4 opacity-50" />
      </SelectTrigger>
      {isOpen && (
        <SelectContent onClose={() => setIsOpen(false)}>
          {React.Children.map(children, child => 
            React.cloneElement(child, { 
              onSelect: (itemValue) => {
                onValueChange(itemValue);
                setIsOpen(false);
              }
            })
          )}
        </SelectContent>
      )}
    </div>
  );
};

const SelectTrigger = ({ children, className = '', onClick, ...props }) => {
  return (
    <button
      className={`flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 ${className}`}
      onClick={onClick}
      {...props}
    >
      {children}
    </button>
  );
};

const SelectValue = ({ value, placeholder = "اختر..." }) => {
  return <span className="line-clamp-1">{value || placeholder}</span>;
};

const SelectContent = ({ children, onClose, className = '' }) => {
  return (
    <>
      <div className="fixed inset-0 z-40" onClick={onClose} />
      <div className={`absolute top-full left-0 right-0 z-50 mt-1 max-h-96 overflow-hidden rounded-md border bg-popover text-popover-foreground shadow-md ${className}`}>
        <div className="p-1">
          {children}
        </div>
      </div>
    </>
  );
};

const SelectItem = ({ value, children, onSelect, className = '' }) => {
  return (
    <div
      className={`relative flex w-full cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none hover:bg-accent hover:text-accent-foreground ${className}`}
      onClick={() => onSelect(value)}
    >
      {children}
    </div>
  );
};

export { Select, SelectTrigger, SelectValue, SelectContent, SelectItem };