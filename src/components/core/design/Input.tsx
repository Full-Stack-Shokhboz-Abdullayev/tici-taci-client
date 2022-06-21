import { DetailedHTMLProps, FC, InputHTMLAttributes } from 'react';

const Input: FC<
  DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> & {
    styleType: 'black' | 'yellow';
  }
> = ({ children, className, styleType, ...props }) => {
  return (
    <input
      className={`${className} p-2 outline-none rounded custom-input-${styleType} transition-all`}
      {...props}
    >
      {children}
    </input>
  );
};

export default Input;
