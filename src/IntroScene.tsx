import React from "react";
import './styles/IntroScene.css'; // Import the CSS

interface Props {
  onStartGame: () => void;
}

const IntroScene: React.FC<Props> = ({ onStartGame }) => {
  return (
    <div className="intro-container">
      <h1 className="header-text">César Puentes: Software Engineer</h1>
      <button className="intro-button" onClick={onStartGame}>
        Start Tour
      </button>
      
      <a 
        href="https://github.com/LotusCD/CV/raw/main/CV-CesarPuentes-2023.docx" 
        target="_blank" 
        rel="noopener noreferrer"
      >
        <button className="intro-button">
          View CV
        </button>
      </a>
    </div>
  );
};

export default IntroScene;
