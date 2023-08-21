// App.tsx

import React from "react";
import GameScene from "./GameScene";

import "./styles.css"; // or wherever your CSS file is

const App: React.FC = () => {
  return (
    <div className="canvas-container">
      <GameScene />
    </div>
  );
};

export default App;
