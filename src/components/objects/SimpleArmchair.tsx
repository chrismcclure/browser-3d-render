import BoxObject from '../primitives/BoxObject'
import ObjectDebugLabel from '../debug/ObjectDebugLabel'
import type { DebugNameProps } from '../../types/debug'

const ARM_WIDTH = 0.55
const BASE_HEIGHT = 0.38
const CUSHION_HEIGHT = 0.22
const BACK_THICKNESS = 0.4

type SimpleArmchairProps = DebugNameProps & {
  position?: [number, number, number]
  width?: number
  depth?: number
  height?: number
  color?: string
  rotation?: [number, number, number]
}

export default function SimpleArmchair({
  debugName,
  position = [0, 0, 0],
  width = 2.5,
  depth = 2.5,
  height = 2.8,
  color = '#627fa8',
  rotation = [0, 0, 0],
}: SimpleArmchairProps) {
  const backHeight = height - BASE_HEIGHT
  const halfWidth = width / 2
  const halfDepth = depth / 2
  const cushionWidth = width - ARM_WIDTH * 2
  const cushionDepth = depth - BACK_THICKNESS - 0.2
  const armHeight = BASE_HEIGHT + CUSHION_HEIGHT + backHeight * 0.45

  return (
    <group position={position} rotation={rotation}>
      <BoxObject
        width={width}
        height={BASE_HEIGHT}
        depth={depth}
        color={color}
        position={[0, BASE_HEIGHT / 2, 0]}
      />

      <BoxObject
        width={width}
        height={backHeight}
        depth={BACK_THICKNESS}
        color={color}
        position={[0, BASE_HEIGHT + backHeight / 2, -halfDepth + BACK_THICKNESS / 2]}
      />

      <BoxObject
        width={ARM_WIDTH}
        height={armHeight}
        depth={depth - 0.25}
        color={color}
        position={[-halfWidth + ARM_WIDTH / 2, armHeight / 2, 0.12]}
      />
      <BoxObject
        width={ARM_WIDTH}
        height={armHeight}
        depth={depth - 0.25}
        color={color}
        position={[halfWidth - ARM_WIDTH / 2, armHeight / 2, 0.12]}
      />

      <BoxObject
        width={cushionWidth}
        height={CUSHION_HEIGHT}
        depth={cushionDepth}
        color={color}
        position={[0, BASE_HEIGHT + CUSHION_HEIGHT / 2, BACK_THICKNESS / 2 + 0.08]}
      />
      <ObjectDebugLabel name={debugName} offset={[0, height + 0.25, 0]} />
    </group>
  )
}
