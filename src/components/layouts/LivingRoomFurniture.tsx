import SimpleAreaRug from '../objects/SimpleAreaRug'
import SimpleArmchair from '../objects/SimpleArmchair'
import SimpleCoffeeTable from '../objects/SimpleCoffeeTable'
import SimpleSofa from '../objects/SimpleSofa'
import SimpleTV from '../objects/SimpleTV'
import SimpleTVStand from '../objects/SimpleTVStand'

const WALL_THICKNESS = 0.1
const WIDTH = 16
const DEPTH = 14
const ARMCHAIR_COLOR = '#627fa8'

type LivingRoomFurnitureProps = {
  position?: [number, number, number]
}

export default function LivingRoomFurniture({
  position = [0, 0, 0],
}: LivingRoomFurnitureProps) {
  const halfWidth = WIDTH / 2
  const halfDepth = DEPTH / 2
  const frontZ = halfDepth - WALL_THICKNESS / 2
  const backZ = -halfDepth + WALL_THICKNESS / 2
  const leftX = -halfWidth + WALL_THICKNESS / 2
  const rightX = halfWidth - WALL_THICKNESS / 2

  const tvStandHeight = 2.2
  const tvStandDepth = 1.5
  const tvRotation: [number, number, number] = [0, -Math.PI / 2, 0]
  const tvStandX = leftX + tvStandDepth / 2
  const tvStandZ = 0

  return (
    <group position={position}>
      <SimpleAreaRug position={[0, 0, -0.25]} width={10.5} depth={12} />

      <SimpleSofa
        position={[0, 0, backZ + 1.85]}
        width={8}
        depth={3.5}
        height={3}
      />

      <SimpleSofa
        position={[rightX - 2.05, 0, -0.2]}
        width={6}
        depth={3.5}
        height={3}
        rotation={[0, -Math.PI / 2, 0]}
      />

      <SimpleArmchair
        position={[-2.75, 0, frontZ - 2.2]}
        color={ARMCHAIR_COLOR}
        rotation={[0, Math.PI, 0]}
      />
      <SimpleArmchair
        position={[2.75, 0, frontZ - 2.2]}
        color={ARMCHAIR_COLOR}
        rotation={[0, Math.PI, 0]}
      />

      <SimpleCoffeeTable position={[0, 0, 0]} />

      <SimpleTVStand
        position={[tvStandX, 0, tvStandZ]}
        width={5}
        depth={tvStandDepth}
        height={tvStandHeight}
        rotation={tvRotation}
      />
      <SimpleTV
        position={[tvStandX, tvStandHeight + 1.35, tvStandZ]}
        width={4.5}
        height={2.5}
        wallMount
        rotation={tvRotation}
      />
    </group>
  )
}
