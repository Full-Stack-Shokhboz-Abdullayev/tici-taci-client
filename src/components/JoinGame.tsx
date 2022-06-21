import { validate } from 'class-validator';
import { createValidator } from 'class-validator-formik';
import { useFormik } from 'formik';
import { FC, useCallback, useEffect } from 'react';

import { useSocket } from '../contexts/SocketProvider';
import { CheckGameDto } from '../dto/check-game.dto';
import useModal from '../hooks/useModal';
import useGameStore from '../store/game.store';
import { FormError } from '../typings/shared/types/form-error.type';
import { JoinGame as JoinGameType } from '../typings/shared/types/join-game.type';
import Button from './core/design/Button';
import Input from './core/design/Input';
import JoinGameForm from './JoinGame/JoinGameForm';

const JoinGame: FC = () => {
  const socket = useSocket();
  const { check } = useGameStore();
  const { open } = useModal(<JoinGameForm />, {});

  const submit = useCallback((values: CheckGameDto) => {
    socket.emit('check', {
      code: values.code,
    });
  }, []);

  const {
    errors,
    touched,
    handleBlur,
    handleChange,
    handleSubmit,
    resetForm,
    isSubmitting,
    values,
    setSubmitting,
    setErrors,
  } = useFormik({
    initialValues: new CheckGameDto(),
    validate: createValidator(CheckGameDto),
    onSubmit: submit,
  });

  useEffect(() => {
    const events: Record<string, any> = {
      'check-complete': (game: JoinGameType) => {
        resetForm();
        check(game);
        open();
        setSubmitting(false);
      },
      exception: ({ messages }: FormError) => {
        setErrors(messages);
        setSubmitting(false);
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
    <form
      className="flex flex-col w-full sm:w-2/3 md:w-1/3 lg:w-1/3 m-6 md:m-0"
      onSubmit={handleSubmit}
    >
      <h3 className="text-2xl text-center my-2">Join The Game!</h3>
      <Input
        styleType="yellow"
        className="my-2 text-center"
        placeholder="Enter the game code!"
        onBlur={handleBlur}
        onChange={handleChange}
        value={values.code}
        id="code"
      ></Input>
      <span className="text-red-600 text-center">
        {errors.code && touched.code && errors.code}
      </span>
      <Button
        disabled={(!!errors.code && !!touched.code) || isSubmitting}
        styleType="yellow"
        className="my-2"
        type="submit"
      >
        Enter
      </Button>
    </form>
  );
};

export default JoinGame;
