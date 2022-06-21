import { FC } from 'react';

import NavBar from './components/core/layout/NavBar';
import SocketProvider from './contexts/SocketProvider';
import RouterContext from './router';

const App: FC = () => {
  return (
    <SocketProvider>
      <RouterContext navbar={<NavBar />} />
    </SocketProvider>
  );
};

export default App;
