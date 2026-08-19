"use client";

import { useRef, useState } from "react";

export function AmbientOrb() {
  const orbRef = useRef<HTMLDivElement>(null);
  const [rotation, setRotation] = useState({ x: -8, y: 14 });

  function handlePointerMove(event: React.PointerEvent<HTMLDivElement>) {
    const rect = event.currentTarget.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width - 0.5;
    const y = (event.clientY - rect.top) / rect.height - 0.5;
    setRotation({ x: y * -18 - 8, y: x * 24 + 14 });
  }

  function resetRotation() {
    setRotation({ x: -8, y: 14 });
  }

  return (
    <div
      ref={orbRef}
      className="ambient-orb-wrap pointer-events-auto absolute -right-20 -top-24 hidden h-[27rem] w-[27rem] select-none sm:block"
      aria-hidden="true"
      onPointerMove={handlePointerMove}
      onPointerLeave={resetRotation}
    >
      <div
        className="ambient-orb motion-safe:animate-orb-float"
        style={{ transform: `rotateX(${rotation.x}deg) rotateY(${rotation.y}deg)` }}
      >
        <div className="ambient-orb__core" />
        <div className="ambient-orb__ring ambient-orb__ring--one" />
        <div className="ambient-orb__ring ambient-orb__ring--two" />
        <div className="ambient-orb__ring ambient-orb__ring--three" />
        <div className="ambient-orb__spark ambient-orb__spark--one" />
        <div className="ambient-orb__spark ambient-orb__spark--two" />
      </div>
    </div>
  );
}
