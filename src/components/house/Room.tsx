import type { ReactNode } from 'react'
import BoxObject from '../primitives/BoxObject'
import Floor from '../primitives/Floor'

const WALL_THICKNESS = 0.1
const CEILING_THICKNESS = 0.1

type RoomProps = {
  width?: number
  depth?: number
  height?: number
  wallColor?: string
  floorColor?: string
  ceilingColor?: string
  position?: [number, number, number]
  ceiling?: boolean
  children?: ReactNode
}

type RoomStructureProps = Omit<RoomProps, 'children' | 'position'>

function RoomStructure({
  width = 8,
  depth = 6,
  height = 8,
  wallColor = '#e8e4dc',
  floorColor = '#a08060',
  ceilingColor = '#f5f5f5',
  ceiling = true,
}: RoomStructureProps) {
  const halfWidth = width / 2
  const halfDepth = depth / 2
  const wallY = height / 2

  return (
    <>
      <Floor width={width} depth={depth} color={floorColor} />

      <BoxObject
        width={width}
        height={height}
        depth={WALL_THICKNESS}
        color={wallColor}
        position={[0, wallY, -halfDepth + WALL_THICKNESS / 2]}
      />
      <BoxObject
        width={width}
        height={height}
        depth={WALL_THICKNESS}
        color={wallColor}
        position={[0, wallY, halfDepth - WALL_THICKNESS / 2]}
      />
      <BoxObject
        width={WALL_THICKNESS}
        height={height}
        depth={depth}
        color={wallColor}
        position={[-halfWidth + WALL_THICKNESS / 2, wallY, 0]}
      />
      <BoxObject
        width={WALL_THICKNESS}
        height={height}
        depth={depth}
        color={wallColor}
        position={[halfWidth - WALL_THICKNESS / 2, wallY, 0]}
      />

      {ceiling && (
        <BoxObject
          width={width}
          height={CEILING_THICKNESS}
          depth={depth}
          color={ceilingColor}
          position={[0, height - CEILING_THICKNESS / 2, 0]}
        />
      )}
    </>
  )
}

export default function Room({
  position = [0, 0, 0],
  children,
  ...structureProps
}: RoomProps) {
  return (
    <group position={position}>
      <RoomStructure {...structureProps} />
      {children}
    </group>
  )
}
