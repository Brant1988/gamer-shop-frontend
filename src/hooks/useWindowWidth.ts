import { useLayoutEffect, useState } from "react";

export const useWindowWidth = () => {
  const [size, setSize] = useState<number>(0);
  useLayoutEffect(() => {
    const updateSize = () => {
      setSize(window.innerWidth);
    };
    window.addEventListener("resize", updateSize);
    updateSize();
    return () => window.removeEventListener("resize", updateSize);
  }, []);
  return size;
};
