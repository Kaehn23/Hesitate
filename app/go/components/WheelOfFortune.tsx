"use client";

import React, { useEffect, useRef, useState } from "react";
import { useTheme } from "next-themes";
import gsap from "gsap";

interface WheelOfFortuneProps {
  items: string[];
  onSpinEnd: (selectedItem: string) => void;
  isSpinning: boolean;
}

// Modern vibrant color palette with dark mode variants
const colorPalettes = {
  light: [
    { bg: "#FF6B6B", text: "#FFFFFF" }, // Coral Red
    { bg: "#4ECDC4", text: "#FFFFFF" }, // Turquoise
    { bg: "#FFD93D", text: "#000000" }, // Golden Yellow
    { bg: "#95E1D3", text: "#000000" }, // Mint
    { bg: "#FF8B94", text: "#FFFFFF" }, // Salmon Pink
    { bg: "#6C5CE7", text: "#FFFFFF" }, // Purple
    { bg: "#A8E6CF", text: "#000000" }, // Mint Green
    { bg: "#FFB6B9", text: "#000000" }, // Soft Pink
  ],
  dark: [
    { bg: "#FF4757", text: "#FFFFFF" }, // Vibrant Red
    { bg: "#2ED573", text: "#FFFFFF" }, // Emerald
    { bg: "#FFA502", text: "#000000" }, // Orange
    { bg: "#1E90FF", text: "#FFFFFF" }, // Dodger Blue
    { bg: "#FF6B81", text: "#FFFFFF" }, // Pink
    { bg: "#7B68EE", text: "#FFFFFF" }, // Medium Slate Blue
    { bg: "#20BF6B", text: "#FFFFFF" }, // Green
    { bg: "#FF9F43", text: "#000000" }, // Orange
  ],
};

export const WheelOfFortune: React.FC<WheelOfFortuneProps> = ({
  items,
  onSpinEnd,
  isSpinning,
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { theme } = useTheme();
  const isDark = theme === "dark";
  const [rotation, setRotation] = useState(0);
  const wheelRef = useRef<HTMLDivElement>(null);
  const rotationObj = useRef({ rotation: 0 });
  const [key, setKey] = useState(0); // Add key for forcing remount

  // Reset animation when isSpinning changes
  useEffect(() => {
    if (isSpinning) {
      setKey(prev => prev + 1); // Force remount of wheel
      setRotation(0); // Reset rotation
      rotationObj.current.rotation = 0; // Reset GSAP rotation object
    }
  }, [isSpinning]);

  const drawWheel = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    const radius = Math.min(centerX, centerY) - 10;

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw wheel segments
    const segmentAngle = (2 * Math.PI) / items.length;
    const colors = isDark ? colorPalettes.dark : colorPalettes.light;

    items.forEach((item, index) => {
      const startAngle = index * segmentAngle + rotation;
      const endAngle = (index + 1) * segmentAngle + rotation;
      const color = colors[index % colors.length];

      // Draw segment
      ctx.beginPath();
      ctx.moveTo(centerX, centerY);
      ctx.arc(centerX, centerY, radius, startAngle, endAngle);
      ctx.closePath();

      // Fill with vibrant color
      ctx.fillStyle = color.bg;
      ctx.fill();

      // Add subtle gradient for depth
      const gradient = ctx.createRadialGradient(
        centerX,
        centerY,
        radius * 0.5,
        centerX,
        centerY,
        radius
      );
      gradient.addColorStop(0, isDark ? "rgba(255,255,255,0.1)" : "rgba(255,255,255,0.2)");
      gradient.addColorStop(1, isDark ? "rgba(0,0,0,0.2)" : "rgba(0,0,0,0.1)");
      ctx.fillStyle = gradient;
      ctx.fill();

      // Add border
      ctx.strokeStyle = isDark ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.1)";
      ctx.lineWidth = 2;
      ctx.stroke();

      // Draw text
      ctx.save();
      ctx.translate(centerX, centerY);
      ctx.rotate(startAngle + segmentAngle / 2);
      ctx.textAlign = "right";
      ctx.fillStyle = color.text;
      ctx.font = "bold 14px Arial";
      ctx.fillText(item, radius - 20, 5);
      ctx.restore();
    });

    // Draw center circle with gradient
    const centerGradient = ctx.createRadialGradient(
      centerX,
      centerY,
      0,
      centerX,
      centerY,
      20
    );
    centerGradient.addColorStop(0, isDark ? "#ffffff" : "#f8f9fa");
    centerGradient.addColorStop(1, isDark ? "#2d3436" : "#e9ecef");
    
    ctx.beginPath();
    ctx.arc(centerX, centerY, 20, 0, 2 * Math.PI);
    ctx.fillStyle = centerGradient;
    ctx.fill();
    ctx.strokeStyle = isDark ? "rgba(255,255,255,0.2)" : "rgba(0,0,0,0.1)";
    ctx.lineWidth = 2;
    ctx.stroke();

    // Draw pointer with gradient
    const pointerGradient = ctx.createLinearGradient(
      centerX + radius,
      centerY - 10,
      centerX + radius + 20,
      centerY
    );
    pointerGradient.addColorStop(0, isDark ? "#ffffff" : "#000000");
    pointerGradient.addColorStop(1, isDark ? "#b2bec3" : "#495057");

    ctx.beginPath();
    ctx.moveTo(centerX + radius + 10, centerY);
    ctx.lineTo(centerX + radius - 10, centerY - 10);
    ctx.lineTo(centerX + radius - 10, centerY + 10);
    ctx.closePath();
    ctx.fillStyle = pointerGradient;
    ctx.fill();
    ctx.strokeStyle = isDark ? "rgba(255,255,255,0.2)" : "rgba(0,0,0,0.1)";
    ctx.stroke();
  };

  useEffect(() => {
    if (isSpinning) {
      const spinDuration = 3;
      const startRotation = 0; // Always start from 0 after reset
      const spinAngle = 360 * 15 + Math.random() * 360;

      gsap.to(rotationObj.current, {
        rotation: startRotation + spinAngle,
        duration: spinDuration,
        ease: "power4.out",
        onUpdate: () => {
          if (wheelRef.current) {
            const currentRotation = rotationObj.current.rotation;
            setRotation(currentRotation * (Math.PI / 180));
            wheelRef.current.style.transform = `rotate(${currentRotation}deg)`;
          }
        },
        onComplete: () => {
          const finalRotation = (startRotation + spinAngle) % 360;
          const segmentAngle = 360 / items.length;
          const selectedIndex = Math.floor(
            ((360 - finalRotation) % 360) / segmentAngle
          );
          onSpinEnd(items[selectedIndex]);
        }
      });
    }
  }, [isSpinning, items, onSpinEnd, key]); // Add key to dependencies

  useEffect(() => {
    drawWheel();
  }, [rotation, items, isDark]);

  return (
    <div className="relative w-full max-w-md mx-auto aspect-square">
      <div 
        key={key} // Add key to force remount
        ref={wheelRef}
        className="absolute inset-0"
        style={{ transform: `rotate(${rotation * (180 / Math.PI)}deg)` }}
      >
        <canvas
          ref={canvasRef}
          width={400}
          height={400}
          className="w-full h-full"
        />
      </div>
    </div>
  );
};
 