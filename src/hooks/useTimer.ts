import { useEffect, useRef } from "react";

export function useTimer(
  seconds: number,
  onExpire: () => void,
  active: boolean,
) {
  const remaining = useRef(seconds);

  useEffect(() => {
    if (!active) return;
    remaining.current = seconds;

    const interval = setInterval(() => {
      remaining.current -= 1;
      if (remaining.current <= 0) {
        clearInterval(interval);
        onExpire();
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [active, seconds]);
}
