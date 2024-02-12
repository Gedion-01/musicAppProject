import React, { createContext, useContext, useState, ReactNode } from 'react';

// Step 1: Define the type of your counter context
interface CounterContextType {
  count: number;
  increment: () => void;
  decrement: () => void;
}

// Step 2: Create a Context
const CounterContext = createContext<React.Provider<undefined>(undefined);

// Step 3: Create a Provider
export const CounterProvider: React.FC = ({ children }) => {
  // Step 4: Define State and Actions
  const [count, setCount] = useState<number>(0);

  // Increment function
  const increment = () => {
    setCount((prevCount) => prevCount + 1);
  };

  // Decrement function
  const decrement = () => {
    setCount((prevCount) => prevCount - 1);
  };

  // Step 5: Pass State and Actions to Value Prop
  const contextValue: CounterContextType = {
    count,
    increment,
    decrement,
  };

  return (
    <CounterContext.Provider value={contextValue}>
      {children}
    </CounterContext.Provider>
  );
};

// Step 6: Create a custom hook to consume the counter context
export const useCounter = (): CounterContextType => {
  const context = useContext(CounterContext);
  if (!context) {
    throw new Error('useCounter must be used within a CounterProvider');
  }
  return context;
};
