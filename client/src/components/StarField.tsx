import React, { useRef, useMemo, useState, useEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Points, PointMaterial } from '@react-three/drei';
import * as THREE from 'three';

interface StarFieldProps {
  count?: number;
  speed?: number;
}

function StarFieldScene({ count = 1000, speed = 0.001 }: StarFieldProps) {
  const pointsRef = useRef<THREE.Points>(null);
  const { mouse } = useThree();
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  // Generate random star positions
  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count * 3; i += 3) {
      pos[i] = (Math.random() - 0.5) * 2000;
      pos[i + 1] = (Math.random() - 0.5) * 2000;
      pos[i + 2] = (Math.random() - 0.5) * 2000;
    }
    return pos;
  }, [count]);

  useFrame(() => {
    if (!pointsRef.current) return;

    // Parallax effect with mouse
    const targetX = mouse.x * 50;
    const targetY = mouse.y * 50;

    pointsRef.current.rotation.x += (targetY - pointsRef.current.rotation.x) * 0.05;
    pointsRef.current.rotation.y += (targetX - pointsRef.current.rotation.y) * 0.05;

    // Slow rotation
    pointsRef.current.rotation.z += speed;
  });

  return (
    <Points ref={pointsRef} positions={positions} stride={3} frustumCulled={false}>
      <PointMaterial
        transparent
        color="#f5a623"
        size={2}
        sizeAttenuation={true}
        depthWrite={false}
      />
    </Points>
  );
}

export function StarField({ count = 1000, speed = 0.001 }: StarFieldProps) {
  const [isSupported, setIsSupported] = useState(true);

  useEffect(() => {
    // Check if user prefers reduced motion
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    setIsSupported(!prefersReduced);
  }, []);

  if (!isSupported) {
    return (
      <div className="absolute inset-0 bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900" />
    );
  }

  return (
    <Canvas
      className="absolute inset-0"
      camera={{ position: [0, 0, 100], fov: 75 }}
      gl={{ alpha: true, antialias: true }}
    >
      <StarFieldScene count={count} speed={speed} />
    </Canvas>
  );
}

export default StarField;
