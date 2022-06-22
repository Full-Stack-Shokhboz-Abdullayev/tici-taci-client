import { DetailedHTMLProps, FC, InputHTMLAttributes } from 'react';

const Input: FC<
  DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> & {
    styleType: 'black' | 'yellow';
    innerRef?: any;
  }
> = ({ children, className, styleType, innerRef, ...props }) => {
  return (
    <input
      className={`${className} p-2 outline-none rounded custom-input-${styleType} transition-all`}
      {...props}
      ref={innerRef}
    >
      {children}
    </input>
  );
};

export default Input;
