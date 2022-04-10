import { FC, FormEventHandler, useEffect } from 'react';

import { useSocket } from '../contexts/SocketProvider';
import useInput from '../hooks/useInput';
import useModal from '../hooks/useModal';
import useGameStore from '../store/game.store';
import { JoinGameDto } from '../typings/shared/dto/join-game.dto';
import Button from './design/Button';
import Input from './design/Input';
import JoinGameForm from './JoinGame/JoinGameForm';

const JoinGame: FC = () => {
  const [gameCode] = useInput('');
  const socket = useSocket();
  const { check } = useGameStore();
  const { open } = useModal(<JoinGameForm />, {});

  useEffect(() => {
    socket?.on('check-complete', (game: JoinGameDto) => {
      if (game) {
        check(game);

        open();
      }
    });
  }, [socket]);

  const handleSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();

    socket?.emit('check', {
      code: gameCode.value,
    });
  };

  return (
    <form
      className="flex flex-col w-full sm:w-2/3 md:w-1/3 lg:w-1/3 m-6 md:m-0"
      onSubmit={handleSubmit}
    >
      <h3 className="text-2xl text-center my-2">Join The Game!</h3>
      <Input
        styleType="yellow"
        className="my-2 text-center"
        placeholder="Enter the game code!"
        {...gameCode}
      ></Input>
      <Button styleType="yellow" className="my-2" type="submit">
        Enter
      </Button>
    </form>
  );
};

export default JoinGame;
