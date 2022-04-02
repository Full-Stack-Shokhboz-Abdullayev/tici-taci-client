import { FC } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import Modal from '../components/Modal';
import GamePage from '../pages/Game.page';
import HomePage from '../pages/Home.page';

const RouterContext: FC<{ navbar?: JSX.Element; footer?: JSX.Element }> = ({
  navbar,
  footer,
}) => {
  return (
    <Router>
      <Modal></Modal>
      {navbar}
      <div className="container sm:min-w-full px-10 sm:px-20 md:px-30 lg:px-60">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/game/:code" element={<GamePage />} />
        </Routes>
      </div>
      {footer}
    </Router>
  );
};

export default RouterContext;
