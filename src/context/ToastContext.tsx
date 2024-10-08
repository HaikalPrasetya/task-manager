"use client";

import Alert from "@/components/Alert";
import { createContext, useContext, useState, ReactNode } from "react";

type toastContextType = {
  setToast: (message: string) => void;
};

const ToastContext = createContext<toastContextType | null>(null);

export const ToastContextProvider = ({ children }: { children: ReactNode }) => {
  const [message, setMessage] = useState("");

  const setToast = (message: string) => {
    setMessage(message);
  };

  return (
    <ToastContext.Provider value={{ setToast }}>
      {message && (
        <Alert className="w-[300px] absolute mt-5 ml-4" message={message} />
      )}

      {children}
    </ToastContext.Provider>
  );
};

export const useToastContext = () => {
  const context = useContext(ToastContext);

  if (!context) {
    throw new Error(
      "useToastContext must be used within a ToastContextProvider"
    );
  }

  return context;
};
