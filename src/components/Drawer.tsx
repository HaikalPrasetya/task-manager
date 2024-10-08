"use client";

import ReactDom from "react-dom";

import { useEffect, useState } from "react";

type Props = {
  active: boolean;
  setActive: React.Dispatch<React.SetStateAction<boolean>>;
  children: string | JSX.Element | JSX.Element[];
};

export default function Drawer({ active, setActive, children }: Props) {
  const [isVisible, setIsVisible] = useState(false);

  const closeDrawer = () => {
    setIsVisible(false);
    setTimeout(() => {
      setActive(false);
    }, 300);
  };

  useEffect(() => {
    if (active) {
      setIsVisible(true);
    }
  }, [active]);

  if (!active) return null;

  return ReactDom.createPortal(
    <div
      role="dialog"
      aria-modal="true"
      data-visible={isVisible ? "true" : "false"}
      className="fixed right-0 group top-0 z-50 flex h-[100dvh] data-[visible=true]:opacity-100 data-[visible=true]:visible data-[visible=false]:opacity-0 data-[visible=false]:invisible w-screen items-start justify-end bg-overlay transition-all duration-300"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="z-10 h-full w-[300px] px-3 group-data-[visible=true]:translate-x-0 group-data-[visible=false]:translate-x-[-250px] border-2 border-border dark:border-darkBorder bg-slate-200 font-base transition-transform duration-300"
      >
        {children}
      </div>
    </div>,
    document.getElementById("drawer") as HTMLElement
  );
}
