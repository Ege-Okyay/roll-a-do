// components/Dice.tsx
import React, { useMemo, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { OrbitControls } from '@react-three/drei';
import Modal from './Modal';

var message = "";

// Function to create a texture from text for dice faces
const createTextTexture = (item: any): THREE.Texture => {
  const canvas = document.createElement('canvas');
  const size = 256;
  canvas.width = size;
  canvas.height = size;
  const context = canvas.getContext('2d');

  if (context) {
    context.fillStyle = 'white';
    context.fillRect(0, 0, size, size);
    context.fillStyle = 'black';
    context.font = '48px Arial';
    context.textAlign = 'center';
    context.textBaseline = 'middle';

    // Draw text on the canvas
    if (typeof item === "string") {
      context.fillText(item, size / 2, size / 2);
    } else {
      context.fillText(item.text || "Roll again!", size / 2, size / 2);
    }
  }

  return new THREE.CanvasTexture(canvas);
};

// Dice component to render and animate a dice
const Dice = ({ items, roll, setRoll }: any) => {
  // Create textures for the dice faces
  const diceTextures = useMemo(() => {
    const faces = [...items];
    while (faces.length < 6) {
      faces.push("Roll again!");
    }
    return faces.slice(0, 6).map(createTextTexture);
  }, [items]);

  const geometry = new THREE.BoxGeometry(1, 1, 1);
  const materials = diceTextures.map(texture => new THREE.MeshBasicMaterial({ map: texture }));

  const meshRef = useRef<THREE.Mesh>(null);
  const rotationSpeed = useRef(0.12);

  // Animation frame to handle dice rolling and rotation
  useFrame(() => {
    if (meshRef.current) {
      if (!roll) {
        meshRef.current.rotation.y += 0.005; // Idle rotation
      } else {
        meshRef.current.rotation.x += rotationSpeed.current; // Rolling rotation
        meshRef.current.rotation.y += rotationSpeed.current;
        rotationSpeed.current -= 0.0002; // Decrease speed

        // Stop rolling and show result
        if (rotationSpeed.current <= 0) {
          let resultIndex;
          if (items.length < 6) {
            const selectedIndex = Math.floor(Math.random() * (items.length + (6 - items.length)));
            resultIndex = selectedIndex === items.length ? null : selectedIndex;
          } else {
            resultIndex = Math.floor(Math.random() * items.length);
          }

          if (resultIndex == null) return;

          // Trigger modal display
          var btn = document.createElement("button");
          btn.onclick = () => {
            var modal: any = document.getElementById("modal");
            if (modal == null) return;
            modal.showModal();
          }
          document.body.appendChild(btn);
          btn.click();
          document.body.removeChild(btn);

          // Set message to display in modal
          message = typeof items[resultIndex] == "undefined" ? "Roll again!" : items[resultIndex].text;

          setRoll(false); // Reset roll state
          rotationSpeed.current = 0.12; // Reset speed
        }
      }
    }
  });

  return (
    <mesh ref={meshRef} geometry={geometry}>
      <boxGeometry args={[2, 2, 2]} /> {/* Define dice size */}
      {materials.map((material, index) => (
        <meshBasicMaterial key={index} attach={`material-${index}`} map={material.map} />
      ))}
    </mesh>
  );
};

// DiceCanvas component to render the dice within a Canvas
const DiceCanvas = ({ items, roll, setRoll }: any) => (
  <div className="h-64">
    <Modal message={message} />

    <Canvas>
      <Dice items={items} roll={roll} setRoll={setRoll} />
      <OrbitControls enablePan={false} /> {/* Disable panning */}
    </Canvas>
  </div>
);

export default DiceCanvas;
