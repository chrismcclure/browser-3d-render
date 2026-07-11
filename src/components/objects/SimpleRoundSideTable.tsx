import BoxObject from '../primitives/BoxObject'

const TOP_THICKNESS = 0.06
const LEG_SIZE = 0.08
const BRACE_THICKNESS = 0.05
const BRACE_HEIGHT = 0.06

type SimpleRoundSideTableProps = {
  position?: [number, number, number]
  rotation?: [number, number, number]
  scale?: number | [number, number, number]
  tabletopRadius?: number
  height?: number
  tabletopColor?: string
  frameColor?: string
}

export default function SimpleRoundSideTable({
  position = [0, 0, 0],
  rotation = [0, 0, 0],
  scale = 1,
  tabletopRadius = 0.65,
  height = 1.55,
  tabletopColor = '#ebe4d8',
  frameColor = '#4a3528',
}: SimpleRoundSideTableProps) {
  const scaleVector: [number, number, number] =
    typeof scale === 'number' ? [scale, scale, scale] : scale

  const legHeight = height - TOP_THICKNESS
  const legY = legHeight / 2
  const topY = height - TOP_THICKNESS / 2
  const legSpread = tabletopRadius * 0.55
  const braceY = legHeight * 0.38

  const legPositions: [number, number, number][] = [
    [-legSpread, legY, -legSpread],
    [legSpread, legY, -legSpread],
    [-legSpread, legY, legSpread],
    [legSpread, legY, legSpread],
  ]

  return (
    <group position={position} rotation={rotation} scale={scaleVector}>
      <mesh position={[0, topY, 0]}>
        <cylinderGeometry args={[tabletopRadius, tabletopRadius, TOP_THICKNESS, 16]} />
        <meshStandardMaterial color={tabletopColor} />
      </mesh>

      {legPositions.map((legPosition, index) => (
        <BoxObject
          key={index}
          width={LEG_SIZE}
          height={legHeight}
          depth={LEG_SIZE}
          color={frameColor}
          position={legPosition}
        />
      ))}

      <BoxObject
        width={legSpread * 2}
        height={BRACE_HEIGHT}
        depth={BRACE_THICKNESS}
        color={frameColor}
        position={[0, braceY, 0]}
      />
      <BoxObject
        width={BRACE_THICKNESS}
        height={BRACE_HEIGHT}
        depth={legSpread * 2}
        color={frameColor}
        position={[0, braceY, 0]}
      />
    </group>
  )
}
