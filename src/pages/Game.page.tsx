import { FC } from 'react';

import Playground from '../components/Playground';
import useGameStore from '../store/game.store';

const GamePage: FC = () => {
  const { title } = useGameStore();
  return (
    <div className="flex items-center py-5 flex-col min-h-screen">
      <h3 className="text-2xl my-4">{title}</h3>
      <Playground className="my-4"></Playground>
    </div>
  );
};

export default GamePage;
