import { FC, ReactNode } from 'react';
import { BrowserRouter as Router, Location, Route, Routes } from 'react-router-dom';

import Modal from '../components/Modal';
import { useSocket } from '../contexts/SocketProvider';
import { useLocationChange } from '../hooks/useLocationChange';
import GamePage from '../pages/Game.page';
import HomePage from '../pages/Home.page';
import useGameStore from '../store/game.store';

const RouteChangeDetector: (props: {
  children?: ReactNode;
  onChange: (location: Location) => void;
}) => any = ({ children, onChange }) => {
  useLocationChange(onChange);
  return children;
};

function useEmptyGame(gamepath: string) {
  const empty = useGameStore((state) => state.empty);
  const socket = useSocket();
  return (location: Location) => {
    if (!location.pathname.startsWith(gamepath)) {
      socket.disconnect();
      empty();
      setTimeout(() => {
        socket.connect();
      });
    }
  };
}

const RouterContext: FC<{ navbar?: JSX.Element; footer?: JSX.Element }> = ({
  navbar,
  footer,
}) => {
  const emptyGame = useEmptyGame('/game');
  return (
    <Router>
      <Modal></Modal>
      {navbar}
      <RouteChangeDetector onChange={emptyGame}>
        <div className="container sm:min-w-full px-10 sm:px-20 md:px-30 lg:px-60">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/game/:code" element={<GamePage />} />
          </Routes>
        </div>
      </RouteChangeDetector>
      {footer}
    </Router>
  );
};

export default RouterContext;
