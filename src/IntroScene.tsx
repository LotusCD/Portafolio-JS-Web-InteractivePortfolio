// IntroScene.tsx

import React from "react";

interface Props {
  onStartGame: () => void;
  onViewPDF: () => void;
}

const IntroScene: React.FC<Props> = ({ onStartGame, onViewPDF }) => {
  const containerStyle: React.CSSProperties = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    height: "100vh" // take full viewport height
  };

  const buttonStyle: React.CSSProperties = {
    margin: "20px", // give space around each button
    padding: "10px 20px",
    fontSize: "1.2rem",
    cursor: "pointer"
  };

  return (
    <div style={containerStyle}>
      <h1>Welcome to my Space</h1>
      <button style={buttonStyle} onClick={onStartGame}>
        Start Tour
      </button>
      <button style={buttonStyle} onClick={onViewPDF}>
        View CV
      </button>
    </div>
  );
};

export default IntroScene;
