import React, { useEffect, useState } from "react";

const barColor = "#e6007e";
const barHeight = "4px";

const LoadingBar = ({ loading }) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (loading) {
      setProgress(0);
      const interval = setInterval(() => {
        setProgress((prev) => (prev < 95 ? prev + 5 : prev));
      }, 100);
      return () => clearInterval(interval);
    } else {
      setProgress(100);
    }
  }, [loading]);

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        zIndex: 9999,
        height: barHeight,
        background: "#eee",
      }}
    >
      <div
        style={{
          height: "100%",
          width: `${progress}%`,
          background: barColor,
          transition: "width 0.3s",
        }}
      />
    </div>
  );
};

export default LoadingBar;