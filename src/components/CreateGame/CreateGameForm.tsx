import { createValidator } from 'class-validator-formik';
import { useFormik } from 'formik';
import { FC, useCallback, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import O from '../../assets/images/o.svg';
import X from '../../assets/images/x.svg';
import { useSocket } from '../../contexts/SocketProvider';
import { CreateGameDto } from '../../dto/create-game.dto';
import useGameStore from '../../store/game.store';
import useModalStore from '../../store/modal.store';
import { CreateGame } from '../../typings/shared/types/create-game.type';
import Button from '../core/design/Button';
import Input from '../core/design/Input';
import SelectSwitch from '../core/design/SelectSwitch';

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
  const { setIsOpen } = useModalStore();
  const socket = useSocket();
  const { create } = useGameStore();
  const navigate = useNavigate();

  const submit = useCallback(async (values: CreateGameDto) => {
    socket.emit('create', {
      title: values.title,
      maker: {
        name: values.name,
        sign: values.sign,
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
    setSubmitting,
    setFieldValue,
  } = useFormik({
    initialValues: new CreateGameDto(),
    onSubmit: submit,
    validate: createValidator(CreateGameDto),
  });

  useEffect(() => {
    const events: Record<string, any> = {
      'create-complete': (data: CreateGame) => {
        create(data);
        setIsOpen(false);
        setSubmitting(false);
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
      <h3 className="text-2xl text-center my-2">Create The Game!</h3>
      <div className="my-4">
        <h4 className="my-2 font-bold text-lg">Your name please:</h4>
        <div className="mx-2">
          <Input
            onBlur={handleBlur}
            onChange={handleChange}
            value={values.name}
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
      <div className="my-4">
        <h4 className="my-2 font-bold text-lg">Game title that you want:</h4>
        <div className="mx-2">
          <Input
            onBlur={handleBlur}
            onChange={handleChange}
            value={values.title}
            id="title"
            styleType="black"
            className="w-full"
            placeholder="The joyyee"
          />
          <span className="text-red-600 inline-block mt-2">
            {errors.title && touched.title && errors.title}
          </span>
        </div>
      </div>
      <div className="my-4">
        <h4 className="my-2 font-bold text-lg">X or O?</h4>
        <SelectSwitch
          value={values.sign}
          options={signs}
          onChange={(value) => setFieldValue('sign', value)}
        ></SelectSwitch>
      </div>
      <div className="flex justify-center mt-8 mx-2">
        <Button
          disabled={!values.name || !values.title || !values.sign || isSubmitting}
          type="submit"
          styleType="yellow"
          className="block w-full border-black border-2 "
        >
          Launch it 🚀
        </Button>
      </div>
    </form>
  );
};

export default CreateGameForm;
