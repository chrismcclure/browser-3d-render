import { Canvas } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import BoxPlayground from './BoxPlayground'
import Room from '../house/Room'
import SimpleTable from '../objects/SimpleTable'
import Floor from '../primitives/Floor'

export default function WorldScene() {
  return (
    <Canvas>
      <ambientLight intensity={0.4} />
      <directionalLight position={[5, 5, 5]} intensity={1} />
      <Floor />
      <BoxPlayground />
      <Room position={[8, 0, -6]} width={10} depth={8} height={8}>
        <SimpleTable position={[0, 0, 0]} width={2.5} depth={1.5} height={2.2} />
      </Room>
      <OrbitControls />
    </Canvas>
  )
}
