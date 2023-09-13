import React, { useEffect, useRef } from "react";
import { Vector3 } from 'three';
import { Text, Plane } from "@react-three/drei";
import { useThree } from "@react-three/fiber";

interface ModalProps {
    position: Vector3,
    idx: number
}

const Modal: React.FC<ModalProps> = ({ position, idx }) => {
    const { size, setSize } = useThree();

    useEffect(() => {
        function updateSize() {
            setSize(window.innerWidth, window.innerHeight);
        }
    
        window.addEventListener('resize', updateSize);
        updateSize();
    
        return () => window.removeEventListener('resize', updateSize);
    }, [setSize]);

    const charLimitPerLine = 42;

    let textWall = '';
    const textZOffset = -1;

    const handleTextClick = (url: string) => {
        window.open(url, "_blank");
    }

    const hyperlinks: { [key: string]: string } = {
        "Feel free to visit my static website.": "https://cesar-static.surge.sh/",
        "You can download my CV here.": "https://github.com/LotusCD/CV/raw/main/CV-CesarPuentes-2023.docx"
    };

    switch (idx) {
        case 0:
            textWall = "Welcome to my interactive digital realm! \n I'm César Puentes, a software engineer.\n Please explore this humble space.";
            break;
        case 1:
            textWall = "Feel free to visit my static website.";
            break;
        case 2:
            textWall = "You can download my CV here.";
            break;
        default:
            textWall = "Default long text...";
    }

    const lines = [];
    while (textWall.length) {
        lines.push(textWall.slice(0, charLimitPerLine));
        textWall = textWall.slice(charLimitPerLine);
    }

    const baseFontSize = 0.3;
    const scaleFactor = size.width > 2500 ? 0.8 : 1;
    const adjustedFontSize = Math.min(baseFontSize * (size.width / 1000) * scaleFactor, 1);

    const planeWidth = Math.min(charLimitPerLine * 0.5 * (size.width / 1000), size.width);
    const planeHeight = lines.length * (0.6 + adjustedFontSize * 0.2) + 1;

    const lineHeight = adjustedFontSize + 0.1 * adjustedFontSize;
    const textBlockHeight = lines.length * lineHeight;
    const verticalOffset = (planeHeight - textBlockHeight) / 2;

    return (
        <>
            <Plane position={[position.x, position.y, position.z-1.5]} args={[planeWidth, planeHeight]} rotation={[0, 0, 0]}>
                <meshBasicMaterial attach="material" color="white" opacity={0.9} transparent />
            </Plane>

            {lines.map((line, index) => {
                const isHyperlink = hyperlinks[line];
                const yPos = position.y + verticalOffset - index * lineHeight;

                return (
                    <>
                        {isHyperlink && (
                            <Plane 
                                position={[position.x, yPos, position.z + textZOffset - 0.1]}
                                args={[line.length * adjustedFontSize * 0.5, lineHeight]}
                                rotation={[0, 0, 0]}
                            >
                                <meshBasicMaterial attach="material" color="rgba(100, 100, 255, 0.6)" transparent />
                            </Plane>
                        )}
                        <Text
                            onClick={isHyperlink ? () => handleTextClick(hyperlinks[line]) : undefined}
                            onPointerOver={() => {
                                if (isHyperlink) {
                                    document.body.style.cursor = 'pointer';
                                }
                            }}
                            onPointerOut={() => {
                                document.body.style.cursor = 'auto';
                            }}
                            position={[
                                position.x,
                                yPos,
                                position.z + textZOffset
                            ]}
                            fontSize={adjustedFontSize}
                            color={isHyperlink ? "white" : "black"}
                            anchorX="center"
                            anchorY="middle"
                        >
                            {line}
                        </Text>
                    </>
                );
            })}
        </>
    );
};

export default Modal;
