import React, { createContext, useState, ReactNode } from "react";

// Define the ContextType interface for the context
interface ContextType {
  rtl: boolean;
  setRtl: React.Dispatch<React.SetStateAction<boolean>>;
}

// Initialize context with an appropriate type
export const gState = createContext<ContextType | undefined>(undefined);

interface ContextProps {
  children: ReactNode; 
}

const Context: React.FC<ContextProps> = ({ children }) => {
  const [rtl, setRtl] = useState<boolean>(false); 

  return <gState.Provider value={{ rtl, setRtl }}>{children}</gState.Provider>;
};

export default Context;
