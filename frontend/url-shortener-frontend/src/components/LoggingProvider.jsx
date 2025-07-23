// components/LoggingProvider.jsx
import React, { createContext, useContext } from 'react';

// Replace this with your actual logging middleware
const customLogger = {
  log: (message, data) => {
    // Example: send logs to backend
    fetch('/api/log', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message, data }),
    });
  },
};

const LoggingContext = createContext();

export const LoggingProvider = ({ children }) => {
  const log = (message, data) => {
    customLogger.log(message, data);
  };
  return (
    <LoggingContext.Provider value={{ log }}>
      {children}
    </LoggingContext.Provider>
  );
};

export const useLogger = () => useContext(LoggingContext);