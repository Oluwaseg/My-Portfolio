"use client"

import { useRef, useEffect, useState } from "react"
import { Canvas, useFrame, useThree } from "@react-three/fiber"
import { TorusKnot, Environment } from "@react-three/drei"

interface ThreeSceneProps {
  mousePosition: { x: number; y: number }
}

function AnimatedTorusKnot({ mousePosition }: ThreeSceneProps) {
  const meshRef = useRef<any>()
  const { viewport } = useThree()

  useFrame(() => {
    if (meshRef.current) {
      // Slow rotation
      meshRef.current.rotation.x += 0.002
      meshRef.current.rotation.y += 0.003

      // Parallax effect based on mouse position
      const targetX = (mousePosition.x / viewport.width) * 0.5
      const targetY = -(mousePosition.y / viewport.height) * 0.5
      meshRef.current.position.x += (targetX - meshRef.current.position.x) * 0.05
      meshRef.current.position.y += (targetY - meshRef.current.position.y) * 0.05
    }
  })

  return (
    <TorusKnot ref={meshRef} args={[1, 0.4, 128, 16]} scale={2}>
      <meshStandardMaterial attach="material" color="#6366F1" roughness={0.5} metalness={0.8} />
    </TorusKnot>
  )
}

export function ThreeScene() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      setMousePosition({
        x: (event.clientX / window.innerWidth) * 2 - 1,
        y: -(event.clientY / window.innerHeight) * 2 + 1,
      })
    }

    window.addEventListener("mousemove", handleMouseMove)

    return () => {
      window.removeEventListener("mousemove", handleMouseMove)
    }
  }, [])

  return (
    <Canvas camera={{ position: [0, 0, 5], fov: 75 }}>
      <ambientLight intensity={0.5} />
      <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} decay={0} intensity={Math.PI} />
      <pointLight position={[-10, -10, -10]} decay={0} intensity={Math.PI} />
      <AnimatedTorusKnot mousePosition={mousePosition} />
      <Environment preset="sunset" /> {/* Provides realistic lighting */}
    </Canvas>
  )
}
