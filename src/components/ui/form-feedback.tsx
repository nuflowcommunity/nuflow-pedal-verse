
import React from 'react';
import { InlineAlert } from './inline-alert';
import { StatusBadge } from './status-badge';

interface FormFeedbackProps {
  type: 'success' | 'error' | 'warning' | 'info';
  message: string;
  title?: string;
  inline?: boolean;
  className?: string;
}

export const FormFeedback: React.FC<FormFeedbackProps> = ({
  type,
  message,
  title,
  inline = false,
  className,
}) => {
  if (inline) {
    return (
      <div className={className}>
        <StatusBadge 
          status={type === 'success' ? 'success' : type === 'error' ? 'error' : 'pending'} 
          text={message}
        />
      </div>
    );
  }

  return (
    <InlineAlert
      type={type}
      title={title}
      message={message}
      className={className}
    />
  );
};
