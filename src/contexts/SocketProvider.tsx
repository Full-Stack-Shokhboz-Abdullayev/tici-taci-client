import { createContext, FC, useContext, useEffect } from 'react';
import { io, Socket } from 'socket.io-client';

const socket = io(import.meta.env.VITE_SOCKET_GATEWAY);

const SocketContext = createContext<Socket>(socket);

export const useSocket = () => {
  return useContext(SocketContext);
};

const SocketProvider: FC = ({ children }) => {
  useEffect(() => {
    return () => {
      socket.close();
    };
  }, []);
  return <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>;
};

export default SocketProvider;
