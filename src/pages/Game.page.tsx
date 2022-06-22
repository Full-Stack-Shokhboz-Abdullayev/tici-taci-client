import { FC } from 'react';

import Playground from '../components/Playground';
import Scores from '../components/Playground/Scores';
import { ShareGame } from '../components/Playground/ShareGame';
import useGameStore from '../store/game.store';

const GamePage: FC = () => {
  const { title, players } = useGameStore();

  return (
    <div className="flex items-center py-5 flex-col min-h-screen">
      <h3 className="text-2xl my-4">{title}</h3>
      <Scores></Scores>
      {players.local && !players.remote && <ShareGame gameLink={window.location.href} />}
      <Playground className="my-4"></Playground>
    </div>
  );
};

export default GamePage;
