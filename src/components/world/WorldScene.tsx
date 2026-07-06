import { Canvas } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import LivingRoomShell from '../house/LivingRoomShell'
import LivingRoomFurniture from '../layouts/LivingRoomFurniture'

export default function WorldScene() {
  return (
    <Canvas>
      <ambientLight intensity={0.4} />
      <directionalLight position={[5, 5, 5]} intensity={1} />
      <LivingRoomShell />
      <LivingRoomFurniture />
      <OrbitControls />
    </Canvas>
  )
}
