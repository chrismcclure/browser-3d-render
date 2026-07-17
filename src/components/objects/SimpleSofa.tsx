import BoxObject from '../primitives/BoxObject'
import ObjectDebugLabel from '../debug/ObjectDebugLabel'
import type { DebugNameProps } from '../../types/debug'

const ARM_WIDTH = 0.7
const BASE_HEIGHT = 0.4
const CUSHION_HEIGHT = 0.25
const BACK_THICKNESS = 0.45
const CUSHION_GAP = 0.1

type SimpleSofaProps = DebugNameProps & {
  position?: [number, number, number]
  width?: number
  depth?: number
  height?: number
  color?: string
  rotation?: [number, number, number]
}

export default function SimpleSofa({
  debugName,
  position = [0, 0, 0],
  width = 8,
  depth = 3.5,
  height = 3,
  color = '#8a8580',
  rotation = [0, 0, 0],
}: SimpleSofaProps) {
  const backHeight = height - BASE_HEIGHT
  const halfWidth = width / 2
  const halfDepth = depth / 2
  const seatInnerWidth = width - ARM_WIDTH * 2
  const cushionWidth = seatInnerWidth / 2 - CUSHION_GAP / 2
  const cushionDepth = depth - BACK_THICKNESS - 0.25
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
        depth={depth - 0.3}
        color={color}
        position={[-halfWidth + ARM_WIDTH / 2, armHeight / 2, 0.15]}
      />
      <BoxObject
        width={ARM_WIDTH}
        height={armHeight}
        depth={depth - 0.3}
        color={color}
        position={[halfWidth - ARM_WIDTH / 2, armHeight / 2, 0.15]}
      />

      <BoxObject
        width={cushionWidth}
        height={CUSHION_HEIGHT}
        depth={cushionDepth}
        color={color}
        position={[
          -cushionWidth / 2 - CUSHION_GAP / 2,
          BASE_HEIGHT + CUSHION_HEIGHT / 2,
          BACK_THICKNESS / 2 + 0.1,
        ]}
      />
      <BoxObject
        width={cushionWidth}
        height={CUSHION_HEIGHT}
        depth={cushionDepth}
        color={color}
        position={[
          cushionWidth / 2 + CUSHION_GAP / 2,
          BASE_HEIGHT + CUSHION_HEIGHT / 2,
          BACK_THICKNESS / 2 + 0.1,
        ]}
      />
      <ObjectDebugLabel name={debugName} offset={[0, height + 0.25, 0]} />
    </group>
  )
}
