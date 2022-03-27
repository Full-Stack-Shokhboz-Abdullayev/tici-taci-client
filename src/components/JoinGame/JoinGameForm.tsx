import { FC, FormEventHandler } from 'react';
import { useNavigate } from 'react-router-dom';

import { useSocket } from '../../contexts/SocketProvider';
import useInput from '../../hooks/useInput';
import useGameStore from '../../store/game.store';
import useModalStore from '../../store/modal.store';
import Button from '../design/Button';
import Input from '../design/Input';

const JoinGameForm: FC = () => {
  const [name, resetName] = useInput('');
  const { setIsOpen } = useModalStore();
  const socket = useSocket();
  const { check, code, title } = useGameStore();
  const navigate = useNavigate();

  const clearData = () => {
    resetName();
  };

  const handleSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();

    socket?.emit('join', {
      code: code,
      joiner: {
        name: name.value,
      },
    });

    socket?.on('join-complete', (data) => {
      check(data);
      setIsOpen(false);
      clearData();
      navigate('/game/' + data.code);
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <h3 className="text-2xl text-center my-2">Join The Game - {title}!</h3>
      <div className="my-4">
        <h4 className="my-2 font-bold text-lg">Your name please:</h4>
        <div className="mx-2">
          <Input
            {...name}
            id="name"
            styleType="black"
            className="w-full"
            placeholder="John Doe"
          />
        </div>
      </div>
      <div className="flex justify-center mt-8 mx-2">
        <Button
          type="submit"
          styleType="yellow"
          className="block w-full border-black border-2"
        >
          Enjoin (enjoy by joining) 🚀
        </Button>
      </div>
    </form>
  );
};

export default JoinGameForm;
