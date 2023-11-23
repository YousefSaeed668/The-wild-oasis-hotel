import { useEffect, useRef } from "react";

export function useOutSideClick(handler, linstenCapturing = true) {
  const ref = useRef();

  useEffect(
    function () {
      function handleClick(e) {
        if (ref.current && !ref.current.contains(e.target)) {
          handler();
        }
      }
      // Without true (linstenCapturing) it will close the window but it will not appear again check react behind the scenes section or serach about this third argument
      document.addEventListener("click", handleClick, linstenCapturing);

      return () =>
        document.removeEventListener("click", handleClick, linstenCapturing);
    },
    [handler, linstenCapturing]
  );
  return ref;
}
