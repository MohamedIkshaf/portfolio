"use client";

import { useRef, useMemo } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Float, MeshDistortMaterial } from "@react-three/drei";
import * as THREE from "three";

// ============================================
// Floating Geometric Shape
// ============================================
function FloatingShape({
  position,
  geometry,
  color,
  speed = 1,
  distort = 0.3,
  scale = 1,
}: {
  position: [number, number, number];
  geometry: "icosahedron" | "octahedron" | "torus" | "sphere";
  color: string;
  speed?: number;
  distort?: number;
  scale?: number;
}) {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (!meshRef.current) return;
    meshRef.current.rotation.x =
      Math.sin(state.clock.elapsedTime * speed * 0.3) * 0.2;
    meshRef.current.rotation.y =
      Math.cos(state.clock.elapsedTime * speed * 0.2) * 0.3;
  });

  const getGeometry = () => {
    switch (geometry) {
      case "icosahedron":
        return <icosahedronGeometry args={[1, 1]} />;
      case "octahedron":
        return <octahedronGeometry args={[1, 0]} />;
      case "torus":
        return <torusGeometry args={[1, 0.4, 16, 32]} />;
      case "sphere":
        return <sphereGeometry args={[1, 32, 32]} />;
    }
  };

  return (
    <Float speed={speed} rotationIntensity={0.5} floatIntensity={1.5}>
      <mesh ref={meshRef} position={position} scale={scale}>
        {getGeometry()}
        <MeshDistortMaterial
          color={color}
          transparent
          opacity={0.15}
          distort={distort}
          speed={speed * 2}
          roughness={0.2}
          metalness={0.8}
        />
      </mesh>
    </Float>
  );
}

// ============================================
// Particle Field
// ============================================
function Particles({ count = 200 }: { count?: number }) {
  const points = useRef<THREE.Points>(null);

  const particlePositions = useMemo(() => {
    const positions = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 20;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 20;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 20;
    }
    return positions;
  }, [count]);

  useFrame((state) => {
    if (!points.current) return;
    points.current.rotation.y = state.clock.elapsedTime * 0.02;
    points.current.rotation.x =
      Math.sin(state.clock.elapsedTime * 0.01) * 0.1;
  });

  return (
    <points ref={points}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[particlePositions, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.02}
        color="#8b5cf6"
        transparent
        opacity={0.6}
        sizeAttenuation
      />
    </points>
  );
}

// ============================================
// Mouse-following light
// ============================================
function MouseLight() {
  const lightRef = useRef<THREE.PointLight>(null);
  const { viewport } = useThree();

  useFrame((state) => {
    if (!lightRef.current) return;
    const x = (state.pointer.x * viewport.width) / 2;
    const y = (state.pointer.y * viewport.height) / 2;
    lightRef.current.position.set(x, y, 3);
  });

  return (
    <pointLight
      ref={lightRef}
      intensity={2}
      color="#8b5cf6"
      distance={8}
    />
  );
}

// ============================================
// Main Scene
// ============================================
function Scene() {
  return (
    <>
      {/* Ambient lighting */}
      <ambientLight intensity={0.1} />
      <directionalLight position={[5, 5, 5]} intensity={0.3} color="#e0e0ff" />

      {/* Mouse-interactive light */}
      <MouseLight />

      {/* Floating shapes */}
      <FloatingShape
        position={[-3, 2, -2]}
        geometry="icosahedron"
        color="#8b5cf6"
        speed={0.8}
        distort={0.4}
        scale={1.5}
      />
      <FloatingShape
        position={[3.5, -1, -3]}
        geometry="octahedron"
        color="#06b6d4"
        speed={1.2}
        distort={0.3}
        scale={1.2}
      />
      <FloatingShape
        position={[-2, -2.5, -4]}
        geometry="torus"
        color="#a855f7"
        speed={0.6}
        distort={0.2}
        scale={0.8}
      />
      <FloatingShape
        position={[4, 2.5, -5]}
        geometry="sphere"
        color="#7c3aed"
        speed={1}
        distort={0.5}
        scale={1}
      />
      <FloatingShape
        position={[0, 0, -6]}
        geometry="icosahedron"
        color="#06b6d4"
        speed={0.5}
        distort={0.3}
        scale={2}
      />

      {/* Particle field */}
      <Particles count={300} />
    </>
  );
}

// ============================================
// Exported Canvas Component
// ============================================
export function HeroScene() {
  return (
    <Canvas
      camera={{ position: [0, 0, 5], fov: 60 }}
      dpr={[1, 1.5]}
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        pointerEvents: "auto",
      }}
      gl={{
        antialias: true,
        alpha: true,
        powerPreference: "high-performance",
      }}
    >
      <Scene />
    </Canvas>
  );
}

export default HeroScene;
