"use client";
import { useEffect, useState } from "react";
import { gsap } from "gsap";

export default function FloatingBackground() {
  const [circles, setCircles] = useState<any[]>([]);

  useEffect(() => {
    const generated = Array.from({ length: 20 }).map((_, i) => ({
      id: i,
      top: `${Math.random() * 100}%`,
      left: `${Math.random() * 100}%`,
      size: 80 + Math.random() * 120,
    }));
    setCircles(generated);
  }, []);

  useEffect(() => {
    if (circles.length === 0) return;

    gsap.utils.toArray<HTMLElement>(".circle").forEach((circle) => {
      gsap.to(circle, {
        x: "random(-150, 150)",
        y: "random(-150, 150)",
        duration: () => gsap.utils.random(6, 12),
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });
    });
  }, [circles]);

  const colors = [
    "bg-pink-400",
    "bg-blue-400",
    "bg-green-400",
    "bg-yellow-400",
    "bg-purple-400",
    "bg-red-400",
    "bg-cyan-400",
    "bg-orange-400",
  ];

  return (
    <div className="absolute inset-0 -z-10 overflow-hidden">
      {circles.map((circle, i) => (
        <div
          key={circle.id}
          className={`circle absolute rounded-full opacity-20 ${
            colors[i % colors.length]
          }`}
          style={{
            top: circle.top,
            left: circle.left,
            width: `${circle.size}px`,
            height: `${circle.size}px`,
          }}
        />
      ))}
    </div>
  );
}
