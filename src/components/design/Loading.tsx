import { FC } from 'react';

interface Props {
  show: boolean;
  className?: string;
}

const Loading: FC<Props> = ({ show, className }) => {
  if (!show) return <></>;
  const localClassName = ' flex justify-center items-start';
  return (
    <div className={className ? className + localClassName : localClassName}>
      <div className="dot-bricks"></div>
    </div>
  );
};

export default Loading;
