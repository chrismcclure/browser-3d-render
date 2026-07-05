import { Canvas } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import BoxObject from '../primitives/BoxObject'
import Floor from '../primitives/Floor'

export default function WorldScene() {
  return (
    <Canvas>
      <ambientLight intensity={0.4} />
      <directionalLight position={[5, 5, 5]} intensity={1} />
      <Floor />
      <BoxObject position={[0, 0.5, 0]} />
      <OrbitControls />
    </Canvas>
  )
}
