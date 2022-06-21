import { FC } from 'react';

import Button from './Button';

interface Option {
  value: string;
  label: string;
  img?: string;
}

interface SelectSwitchProps {
  options: Option[];
  onChange: (value: string) => void;
  className?: string;
  value: string | number;
}

const SelectSwitch: FC<SelectSwitchProps> = ({ options, onChange, className, value }) => {
  return (
    <div className={`${className} select-switch flex justify-between`}>
      {options.map((option, index) => (
        <Button
          type="button"
          className={`w-full font-bold mx-2 flex justify-center ${
            option.value === value ? 'active' : ''
          }`}
          onClick={() => onChange(option.value)}
          styleType="black"
          key={'switch ' + index}
        >
          {option.img ? (
            <img
              src={option.img}
              style={
                option.value !== value
                  ? {
                      WebkitFilter: 'invert(1)',
                      filter: 'invert(1)',
                    }
                  : {}
              }
              width="20"
              height="20"
              alt={option.label}
            />
          ) : (
            option.label
          )}
        </Button>
      ))}
    </div>
  );
};
export default SelectSwitch;
