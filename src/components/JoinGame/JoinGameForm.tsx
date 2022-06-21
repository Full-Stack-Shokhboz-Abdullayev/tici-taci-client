import { createValidator } from 'class-validator-formik';
import { useFormik } from 'formik';
import { FC, useCallback, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { useSocket } from '../../contexts/SocketProvider';
import { JoinGameFormDto } from '../../dto/join-game.dto';
import useGameStore from '../../store/game.store';
import useModalStore from '../../store/modal.store';
import Button from '../core/design/Button';
import Input from '../core/design/Input';

const JoinGameForm: FC = () => {
  const { setIsOpen } = useModalStore();
  const socket = useSocket();
  const { check, code, title } = useGameStore();
  const navigate = useNavigate();

  const submit = useCallback(async (values: JoinGameFormDto) => {
    socket.emit('join', {
      code,
      joiner: {
        name: values.name,
      },
    });
  }, []);

  const {
    resetForm,
    handleSubmit,
    handleBlur,
    handleChange,
    values,
    errors,
    touched,
    isSubmitting,
  } = useFormik({
    initialValues: new JoinGameFormDto(),
    onSubmit: submit,
    validate: createValidator(JoinGameFormDto),
  });

  useEffect(() => {
    const events: Record<string, any> = {
      'join-complete': (data: any) => {
        check(data);
        setIsOpen(false);
        resetForm();
        navigate('/game/' + data.code);
      },
    };

    Object.keys(events).forEach((event) => {
      socket.on(event, events[event]);
    });
    return () => {
      Object.keys(events).forEach((event) => {
        socket.off(event, events[event]);
      });
    };
  }, []);

  return (
    <form onSubmit={handleSubmit}>
      <h3 className="text-2xl text-center my-2">Join The Game - {title}!</h3>
      <div className="my-4">
        <h4 className="my-2 font-bold text-lg">Your name please:</h4>
        <div className="mx-2">
          <Input
            onBlur={handleBlur}
            onChange={handleChange}
            id="name"
            styleType="black"
            className="w-full"
            placeholder="John Doe"
          />
          <span className="text-red-600 inline-block mt-2">
            {errors.name && touched.name && errors.name}
          </span>
        </div>
      </div>
      <div className="flex justify-center mt-8 mx-2">
        <Button
          disabled={!values.name || isSubmitting}
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
