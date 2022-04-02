import { FC, FormEventHandler, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import O from '../../assets/images/o.svg';
import X from '../../assets/images/x.svg';
import { useSocket } from '../../contexts/SocketProvider';
import useInput from '../../hooks/useInput';
import useGameStore from '../../store/game.store';
import useModalStore from '../../store/modal.store';
import { CreateGameDto } from '../../typings/shared/dto/create-game.dto';
import Button from '../design/Button';
import Input from '../design/Input';
import SelectSwitch from '../design/SelectSwitch';

const signs = [
  {
    label: 'X',
    img: X,
    value: 'X',
  },
  {
    label: 'O',
    img: O,
    value: 'O',
  },
];

const CreateGameForm: FC = () => {
  const [selectedSign, setSelectedSign] = useState('');
  const [name, resetName] = useInput('');
  const [title, resetTitle] = useInput('');
  const { setIsOpen } = useModalStore();
  const socket = useSocket();
  const { create } = useGameStore();
  const navigate = useNavigate();

  const clearData = () => {
    resetName();
    resetTitle();
    setSelectedSign('');
  };

  const handleSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    if (socket && name.value && title.value && selectedSign) {
      socket?.emit('create', {
        title: title.value,
        maker: {
          name: name.value,
          sign: selectedSign,
        },
      });

      socket?.on('create-complete', (data: CreateGameDto) => {
        create(data);
        setIsOpen(false);
        clearData();
        navigate('/game/' + data.code);
      });
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h3 className="text-2xl text-center my-2">Create The Game!</h3>
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
      <div className="my-4">
        <h4 className="my-2 font-bold text-lg">Game title that you want:</h4>
        <div className="mx-2">
          <Input
            {...title}
            id="name"
            styleType="black"
            className="w-full"
            placeholder="The joyyee"
          />
        </div>
      </div>
      <div className="my-4">
        <h4 className="my-2 font-bold text-lg">X or O?</h4>
        <SelectSwitch
          className=""
          value={selectedSign}
          options={signs}
          onChange={setSelectedSign}
        ></SelectSwitch>
      </div>
      <div className="flex justify-center mt-8 mx-2">
        <Button
          type="submit"
          styleType="yellow"
          className="block w-full border-black border-2"
        >
          Launch it 🚀
        </Button>
      </div>
    </form>
  );
};

export default CreateGameForm;
