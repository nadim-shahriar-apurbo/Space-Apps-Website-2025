import React, { Suspense, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { useGLTF } from '@react-three/drei';
import * as THREE from 'three';

// Sun Model Component
function SunModel() {
  const { scene } = useGLTF('/sun.glb');
  const sunRef = useRef<THREE.Group>(null);
  
  // Auto-rotate the sun
  useFrame((state, delta) => {
    if (sunRef.current) {
      sunRef.current.rotation.y += delta * 0.5;
    }
  });
  
  return (
    <group ref={sunRef}>
      <primitive 
        object={scene} 
        scale={[3, 3, 3]} 
        position={[0, 0, 0]}
      />
    </group>
  );
}

// Loading fallback component
function LoadingFallback() {
  return (
    <div 
      className="relative flex items-center justify-center animate-float"
      style={{ 
        width: '300px',
        height: '300px',
        background: `
          radial-gradient(circle at 30% 30%, 
            #fff9e6 0%, 
            #ffed4e 20%, 
            #ffa500 60%, 
            #ff6b00 100%
          )
        `,
        borderRadius: '50%',
        boxShadow: `
          0 0 50px rgba(255, 200, 0, 0.8),
          0 0 100px rgba(255, 149, 0, 0.4),
          inset -20px -20px 40px rgba(255, 100, 0, 0.3)
        `,
        animation: 'float 3s ease-in-out infinite, sunGlow 2s ease-in-out infinite alternate',
      }}
    >
      {/* Sun surface details */}
      <div 
        className="absolute inset-0 rounded-full"
        style={{
          background: `
            radial-gradient(circle at 60% 40%, rgba(255, 255, 150, 0.3) 0%, transparent 30%),
            radial-gradient(circle at 20% 70%, rgba(255, 100, 0, 0.2) 0%, transparent 25%),
            radial-gradient(circle at 80% 80%, rgba(255, 150, 0, 0.25) 0%, transparent 20%)
          `,
        }}
      />
      
      {/* Center glow */}
      <div 
        className="absolute inset-8 rounded-full"
        style={{
          background: 'radial-gradient(circle, rgba(255, 255, 200, 0.6) 0%, transparent 70%)',
        }}
      />
    </div>
  );
}

const Sun3D: React.FC = () => {
  return (
    <div className="relative w-full h-64 flex items-center justify-center">
      <div 
        style={{ width: '400px', height: '400px' }}
        className="animate-float"
      >
        <Canvas
          camera={{ position: [0, 0, 8], fov: 50 }}
          style={{ 
            background: 'transparent',
            filter: 'drop-shadow(0 0 30px rgba(255, 200, 0, 0.6))',
          }}
        >
          {/* Lighting setup */}
          <ambientLight intensity={0.4} />
          <directionalLight 
            position={[10, 10, 5]} 
            intensity={1.2} 
            color="#ffffff"
          />
          <pointLight 
            position={[0, 0, 10]} 
            intensity={0.8} 
            color="#ffaa00" 
          />
          <pointLight 
            position={[-5, -5, 5]} 
            intensity={0.3} 
            color="#ff6600" 
          />
          
          {/* 3D Sun Model with Suspense for loading */}
          <Suspense fallback={<LoadingFallback />}>
            <SunModel />
          </Suspense>
        </Canvas>
      </div>
    </div>
  );
};

// Preload the GLB model
useGLTF.preload('/sun.glb');

export default Sun3D;