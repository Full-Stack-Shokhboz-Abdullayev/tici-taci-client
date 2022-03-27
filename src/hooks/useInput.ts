import { useState } from 'react';

interface ReturnTypeUseInput {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}
export default function useInput(value: string): [ReturnTypeUseInput, () => void] {
  const [inputValue, setInputValue] = useState(value);
  function onChange(e: React.ChangeEvent<HTMLInputElement>) {
    setInputValue(e.target.value);
  }
  function reset() {
    setInputValue('');
  }

  return [{ value: inputValue, onChange }, reset];
}
