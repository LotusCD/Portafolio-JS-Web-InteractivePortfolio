// Main.tsx

import React, { useState } from "react";
import IntroScene from "./IntroScene";
import GameScene from "./GameScene";
import { Viewer } from "@react-pdf-viewer/core";
import { defaultLayoutPlugin } from "@react-pdf-viewer/default-layout";

const Main: React.FC = () => {
  const [mode, setMode] = useState<"intro" | "game" | "pdf">("intro");

  const handleStartGame = () => {
    setMode("game");
  };

  const handleViewPDF = () => {
    setMode("pdf");
  };

  // Create new plugin instance
  const defaultLayoutPluginInstance = defaultLayoutPlugin();

  switch (mode) {
    case "game":
      return <GameScene />;
    case "pdf":
      return (
        <Viewer
          fileUrl="/assets/pdf-open-parameters.pdf"
          plugins={[defaultLayoutPluginInstance]}
        />
      );
    default:
      return (
        <IntroScene onStartGame={handleStartGame} onViewPDF={handleViewPDF} />
      );
  }
};

export default Main;
