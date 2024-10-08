"use client";

import { useSidebar } from "@/context/MobileSidebar";
import React, { useEffect, useState } from "react";
import { IoIosOptions } from "react-icons/io";

function MobileMenu() {
  const { toggleActive, active } = useSidebar();
  const [widthScreen, setWidthScreen] = useState<number>(0);

  const handleResize = () => {
    setWidthScreen(window.innerWidth);
  };

  useEffect(() => {
    setWidthScreen(window.innerWidth);

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    if (widthScreen >= 1024 && active) {
      toggleActive();
    }
  }, [widthScreen]);

  return (
    <div>
      {widthScreen < 1024 && (
        <IoIosOptions
          size={25}
          className="cursor-pointer"
          onClick={() => toggleActive()}
        />
      )}
    </div>
  );
}

export default MobileMenu;
