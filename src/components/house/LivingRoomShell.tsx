import BoxObject from '../primitives/BoxObject'
import Floor from '../primitives/Floor'
import DoorOpening from '../house/DoorOpening'
import WindowOpening from '../house/WindowOpening'

const WALL_THICKNESS = 0.1

const COLORS = {
  floor: '#c9b08c',
  wall: '#e8dcc8',
  trim: '#b8a078',
}

const WIDTH = 16
const DEPTH = 14
const HEIGHT = 8

const WINDOW_WIDTH = 10
const WINDOW_HEIGHT = 4.5
const WINDOW_SILL = 2.5
const WINDOW_TOP = WINDOW_SILL + WINDOW_HEIGHT

const ENTRY_WIDTH = 4
const ENTRY_HEIGHT = 7
const ENTRY_Z_START = 4
const ENTRY_CENTER_Z = ENTRY_Z_START + ENTRY_WIDTH / 2

type LivingRoomShellProps = {
  position?: [number, number, number]
}

export default function LivingRoomShell({
  position = [0, 0, 0],
}: LivingRoomShellProps) {
  const halfWidth = WIDTH / 2
  const halfDepth = DEPTH / 2
  const frontZ = halfDepth - WALL_THICKNESS / 2
  const backZ = -halfDepth + WALL_THICKNESS / 2
  const leftX = -halfWidth + WALL_THICKNESS / 2
  const rightX = halfWidth - WALL_THICKNESS / 2

  const sideWallWidth = (WIDTH - WINDOW_WIDTH) / 2
  const backWallDepth = ENTRY_Z_START - -halfDepth
  const entryHeaderHeight = HEIGHT - ENTRY_HEIGHT

  return (
    <group position={position}>
      <Floor width={WIDTH} depth={DEPTH} color={COLORS.floor} />

      <BoxObject
        width={WIDTH}
        height={HEIGHT}
        depth={WALL_THICKNESS}
        color={COLORS.wall}
        position={[0, HEIGHT / 2, backZ]}
      />

      <BoxObject
        width={WALL_THICKNESS}
        height={HEIGHT}
        depth={DEPTH}
        color={COLORS.wall}
        position={[rightX, HEIGHT / 2, 0]}
      />

      <BoxObject
        width={sideWallWidth}
        height={HEIGHT}
        depth={WALL_THICKNESS}
        color={COLORS.wall}
        position={[-halfWidth + sideWallWidth / 2, HEIGHT / 2, frontZ]}
      />
      <BoxObject
        width={sideWallWidth}
        height={HEIGHT}
        depth={WALL_THICKNESS}
        color={COLORS.wall}
        position={[halfWidth - sideWallWidth / 2, HEIGHT / 2, frontZ]}
      />
      <BoxObject
        width={WINDOW_WIDTH}
        height={WINDOW_SILL}
        depth={WALL_THICKNESS}
        color={COLORS.wall}
        position={[0, WINDOW_SILL / 2, frontZ]}
      />
      <BoxObject
        width={WINDOW_WIDTH}
        height={HEIGHT - WINDOW_TOP}
        depth={WALL_THICKNESS}
        color={COLORS.wall}
        position={[0, WINDOW_TOP + (HEIGHT - WINDOW_TOP) / 2, frontZ]}
      />

      <WindowOpening
        width={WINDOW_WIDTH}
        height={WINDOW_HEIGHT}
        sillHeight={WINDOW_SILL}
        trimColor={COLORS.trim}
        position={[0, 0, frontZ]}
      />

      <BoxObject
        width={WALL_THICKNESS}
        height={HEIGHT}
        depth={backWallDepth}
        color={COLORS.wall}
        position={[leftX, HEIGHT / 2, -halfDepth + backWallDepth / 2]}
      />
      <BoxObject
        width={WALL_THICKNESS}
        height={entryHeaderHeight}
        depth={ENTRY_WIDTH}
        color={COLORS.wall}
        position={[leftX, ENTRY_HEIGHT + entryHeaderHeight / 2, ENTRY_CENTER_Z]}
      />

      <DoorOpening
        width={ENTRY_WIDTH}
        height={ENTRY_HEIGHT}
        trimColor={COLORS.trim}
        position={[leftX, 0, ENTRY_CENTER_Z]}
      />
    </group>
  )
}
