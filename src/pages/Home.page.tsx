import { FC } from 'react';

import CreateGame from '../components/CreateGame';
import JoinGame from '../components/JoinGame';
import Divider from '../components/layout/Divider';

const HomePage: FC = () => {
  return (
    <div className="w-100 min-h-screen flex justify-center items-center flex-col md:flex-row md:justify-between">
      <JoinGame></JoinGame>
      <Divider direction="vertical"></Divider>
      <CreateGame></CreateGame>
    </div>
  );
};

export default HomePage;
