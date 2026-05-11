'use client';

import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { useTexture } from '@react-three/drei';
import * as THREE from 'three';

const vertexShader = `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const fragmentShader = `
  uniform sampler2D uTexture;
  uniform float uTime;
  uniform float uIntensity;
  varying vec2 vUv;

  // Simple noise function
  float noise(vec2 p) {
    return fract(sin(dot(p, vec2(12.9898, 78.233))) * 43758.5453);
  }

  void main() {
    vec2 uv = vUv;
    
    // Atmospheric 'Lens' distortion
    float dist = distance(uv, vec2(0.5));
    uv -= vec2(0.5);
    uv *= 1.0 + dist * 0.1 * uIntensity; // Subtle barrel distortion
    uv += vec2(0.5);

    // Liquid motion
    float wave = sin(uv.y * 8.0 + uTime * 0.5) * 0.005 * uIntensity;
    uv.x += wave;
    
    // Chromatic aberration
    float r = texture2D(uTexture, uv + vec2(0.002 * uIntensity, 0.0)).r;
    float g = texture2D(uTexture, uv).g;
    float b = texture2D(uTexture, uv - vec2(0.002 * uIntensity, 0.0)).b;
    
    vec3 color = vec3(r, g, b);
    
    // Add film grain
    color += (noise(uv + uTime) - 0.5) * 0.03;

    gl_FragColor = vec4(color, 1.0);
  }
`;

interface WebGLDistortionImageProps {
  src: string;
  intensity: number;
}

export default function WebGLDistortionImage({ src, intensity }: WebGLDistortionImageProps) {
  const meshRef = useRef<THREE.Mesh>(null);
  const texture = useTexture(src);

  const uniforms = useRef({
    uTexture: { value: texture },
    uTime: { value: 0 },
    uIntensity: { value: intensity },
    uMouse: { value: new THREE.Vector2(0, 0) }
  });

  useFrame((state) => {
    uniforms.current.uTime.value = state.clock.getElapsedTime();
  });

  return (
    <mesh ref={meshRef}>
      <planeGeometry args={[1, 1]} />
      <shaderMaterial
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={uniforms.current}
        transparent
      />
    </mesh>
  );
}
