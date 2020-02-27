import { useEffect } from "react";

const useNoTouchMove = () => {
  useEffect(() => {
    document.body.addEventListener("touchmove", e => e.preventDefault(), {
      passive: false
    });
  }, []);
};

export default useNoTouchMove;
