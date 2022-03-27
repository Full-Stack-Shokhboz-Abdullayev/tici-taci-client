import { ButtonHTMLAttributes, DetailedHTMLProps, FC } from 'react';

const Button: FC<
  DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> & {
    styleType: 'black' | 'yellow';
  }
> = ({ children, className, styleType, ...props }) => {
  return (
    <button
      className={`${className} p-3 rounded custom-button-${styleType} transition-all`}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
