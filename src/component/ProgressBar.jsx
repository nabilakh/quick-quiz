import { useEffect, useState } from "react";

const TIMER = 8000;

export default function ProgressBar({ handleAnswer }) {
  const [remainingTime, setRemainingTime] = useState(TIMER);

  useEffect(() => {
    setRemainingTime(TIMER);

    const interval = setInterval(() => {
      setRemainingTime((prev) => {
        if (prev <= 10) {
          clearInterval(interval);
          return 0;
        }
        return prev - 10;
      });
    }, 10);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      handleAnswer("");
    }, TIMER);

    return () => clearTimeout(timer);
  }, [handleAnswer]);

  return (
    <progress className="w-[500px] mt-8" value={remainingTime} max={TIMER} />
  );
}
