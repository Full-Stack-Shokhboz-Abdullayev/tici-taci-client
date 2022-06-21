import { FC } from 'react';

import Divider from '../components/core/layout/Divider';
import CreateGame from '../components/CreateGame';
import JoinGame from '../components/JoinGame';

const HomePage: FC = () => {
  return (
    <div className="w-100 h-[calc(100vh-64px)] flex justify-center items-center flex-col md:flex-row md:justify-between">
      <JoinGame></JoinGame>
      <Divider direction="vertical"></Divider>
      <CreateGame></CreateGame>
    </div>
  );
};

export default HomePage;
