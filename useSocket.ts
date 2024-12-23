import { useEffect, useState } from 'react';
import io from 'socket.io-client';

const useSocket = (url: string) => {
  const [socket, setSocket] = useState<any>(null);

  useEffect(() => {
    const socketConnection = io(url);
    setSocket(socketConnection);

    return () => {
      socketConnection.disconnect();
    };
  }, [url]);

  return socket;
};

export default useSocket;
