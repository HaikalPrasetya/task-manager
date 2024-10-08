"use client";

import { createContext, useContext, ReactNode, useState } from "react";

type SidebarContextType = {
  active: boolean;
  toggleActive: () => void;
};

const MobileContext = createContext<SidebarContextType | undefined>(undefined);

export const MobileSidebarProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [active, setActive] = useState(false);

  const toggleActive = () => {
    setActive((prev) => (prev === true ? false : true));
  };

  return (
    <MobileContext.Provider value={{ active, toggleActive }}>
      {children}
    </MobileContext.Provider>
  );
};

export const useSidebar = () => {
  const context = useContext(MobileContext);

  if (!context) {
    throw new Error("useSidbear must be used within a MobileContextProvider");
  }

  return context;
};
