import React, { useEffect } from 'react';

const WakeUpServer = ({ children }) => {
  useEffect(() => {
    const wakeUpServer = async () => {
      try {
        const response = await fetch('https://purigo-backend-2.onrender.com/wakeup');
        if (!response.ok) {
          throw new Error('Server wake-up call failed');
        }
        console.log('Server is awake');
      } catch (error) {
        console.error('Failed to wake up server:', error);
      }
    };

    wakeUpServer();
  }, []);

  return <>{children}</>;
};

export default WakeUpServer;
