// DeviceContext.js
import React, { createContext, useState, useContext } from "react";

// Create the context
const DeviceContext = createContext();

// Create a custom hook to use the context
export const useDevice = () => {
  return useContext(DeviceContext);
};

// Create the provider component
export const DeviceProvider = ({ children }) => {
  const [deviceIp, setDeviceIp] = useState(null);

  const connectDevice = (ip) => {
    setDeviceIp(ip); // Update device IP state after connection
  };

  return (
    <DeviceContext.Provider value={{ deviceIp, connectDevice }}>
      {children}
    </DeviceContext.Provider>
  );
};
