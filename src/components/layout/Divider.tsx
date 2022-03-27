import { FC } from 'react';

interface DividerProps {
  direction: 'horizontal' | 'vertical';
}

const Divider: FC<DividerProps> = ({ direction }) => {
  return (
    <div className="divider-container">
      <div className={`or ${direction}`}>or</div>
    </div>
  );
};

export default Divider;
