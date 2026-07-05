import BoxObject from '../primitives/BoxObject'

const LEG_SIZE = 0.15
const TOP_THICKNESS = 0.1

type SimpleTableProps = {
  position?: [number, number, number]
  width?: number
  depth?: number
  height?: number
  color?: string
}

export default function SimpleTable({
  position = [0, 0, 0],
  width = 2,
  depth = 1,
  height = 2,
  color = '#8b5a2b',
}: SimpleTableProps) {
  const legHeight = height - TOP_THICKNESS
  const halfWidth = width / 2 - LEG_SIZE / 2
  const halfDepth = depth / 2 - LEG_SIZE / 2
  const legY = legHeight / 2
  const topY = height - TOP_THICKNESS / 2

  const legPositions: [number, number, number][] = [
    [-halfWidth, legY, -halfDepth],
    [halfWidth, legY, -halfDepth],
    [-halfWidth, legY, halfDepth],
    [halfWidth, legY, halfDepth],
  ]

  return (
    <group position={position}>
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
    </group>
  )
}
