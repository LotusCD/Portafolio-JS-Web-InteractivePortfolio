// App.tsx

import React from "react";
import Main from "./Main";

import "./styles.css"; // or wherever your CSS file is

const App: React.FC = () => {
  return (
    <div className="canvas-container">
      <Main />
    </div>
  );
};

export default App;
