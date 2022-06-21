import { ButtonHTMLAttributes, DetailedHTMLProps, FC } from 'react';

const Button: FC<
  DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> & {
    styleType: 'black' | 'yellow';
  }
> = ({ children, className, styleType, ...props }) => {
  return (
    <button
      className={`${className} p-3 rounded custom-button-${styleType} transition-all disabled:opacity-50 disabled:cursor-not-allowed`}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
