import { FC } from 'react';

import Playground from '../components/Playground';
import Scores from '../components/Playground/Scores';
import useGameStore from '../store/game.store';

window.onbeforeunload = function () {
  return 'Leaving this page will reset the game!';
};

const GamePage: FC = () => {
  const { title } = useGameStore();

  return (
    <div className="flex items-center py-5 flex-col min-h-screen">
      <h3 className="text-2xl my-4">{title}</h3>
      <Scores></Scores>
      <Playground className="my-4"></Playground>
    </div>
  );
};

export default GamePage;
