import { useEffect } from "react";

const CountDownTimer = ({ time, setTime }) => {
  useEffect(() => {
    if (time <= 0) return; // Don't start timer if already at 0
    let timer = setInterval(() => {
      setTime((time) => {
        if (time === 0) {
          clearInterval(timer);
          return 0;
        } else return time - 1;
      });
    }, 1000);

    // Cleanup function to clear interval
    return () => clearInterval(timer);
  }, []);

  return (
    <>
      {`${Math.floor(time / 60)}`.padStart(2, 0)}:
      {`${time % 60}`.padStart(2, 0)}
    </>
  );
};

export default CountDownTimer;
