import BoxObject from '../primitives/BoxObject'
import ObjectDebugLabel from '../debug/ObjectDebugLabel'
import type { DebugNameProps } from '../../types/debug'

const LEG_SIZE = 0.12
const TOP_THICKNESS = 0.08
const SHELF_THICKNESS = 0.06

type SimpleCoffeeTableProps = DebugNameProps & {
  position?: [number, number, number]
  width?: number
  depth?: number
  height?: number
  color?: string
  rotation?: [number, number, number]
  shelf?: boolean
}

export default function SimpleCoffeeTable({
  debugName,
  position = [0, 0, 0],
  width = 3.5,
  depth = 2,
  height = 1.2,
  color = '#6b5344',
  rotation = [0, 0, 0],
  shelf = true,
}: SimpleCoffeeTableProps) {
  const legHeight = height - TOP_THICKNESS
  const halfWidth = width / 2 - LEG_SIZE / 2
  const halfDepth = depth / 2 - LEG_SIZE / 2
  const legY = legHeight / 2
  const topY = height - TOP_THICKNESS / 2
  const shelfY = 0.3

  const legPositions: [number, number, number][] = [
    [-halfWidth, legY, -halfDepth],
    [halfWidth, legY, -halfDepth],
    [-halfWidth, legY, halfDepth],
    [halfWidth, legY, halfDepth],
  ]

  return (
    <group position={position} rotation={rotation}>
      <BoxObject
        width={width}
        height={TOP_THICKNESS}
        depth={depth}
        color={color}
        position={[0, topY, 0]}
      />

      {legPositions.map((legPosition, index) => (
        <BoxObject
          key={index}
          width={LEG_SIZE}
          height={legHeight}
          depth={LEG_SIZE}
          color={color}
          position={legPosition}
        />
      ))}

      {shelf && (
        <BoxObject
          width={width - 0.4}
          height={SHELF_THICKNESS}
          depth={depth - 0.4}
          color={color}
          position={[0, shelfY, 0]}
        />
      )}
      <ObjectDebugLabel name={debugName} offset={[0, height + 0.25, 0]} />
    </group>
  )
}
