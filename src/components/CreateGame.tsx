import { FC } from 'react';

import useModal from '../hooks/useModal';
import CreateGameForm from './CreateGame/CreateGameForm';
import Button from './design/Button';

const CreateGame: FC = () => {
  const { open } = useModal(<CreateGameForm />, {});

  return (
    <div className="flex w-full sm:w-2/3 md:w-1/3 lg:w-1/3 m-6 md:m-0">
      <Button styleType="yellow" onClick={open} className="w-full">
        Create Game
      </Button>
    </div>
  );
};

export default CreateGame;
