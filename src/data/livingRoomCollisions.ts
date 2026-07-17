import {
  boxFromCenterSize,
  boxFromRotatedCenterSize,
  type CollisionBox,
} from '../utils/collision'

const ROOM = {
  width: 16,
  depth: 16,
  wallThickness: 0.1,
}

const ENTRY_Z_START = 3
const ENTRY_Z_END = ENTRY_Z_START + 4

const halfWidth = ROOM.width / 2
const halfDepth = ROOM.depth / 2
const backZ = -halfDepth + ROOM.wallThickness / 2
const frontZ = halfDepth - ROOM.wallThickness / 2
const leftX = -halfWidth + ROOM.wallThickness / 2
const rightX = halfWidth - ROOM.wallThickness / 2

const tvStandDepth = 1.5
const tvStandX = leftX + tvStandDepth / 2

export const PLAYER_RADIUS = 0.4
const WALL_INSET = 0.05

export function isWalkablePosition(x: number, z: number, radius = PLAYER_RADIUS): boolean {
  const innerMinX = -halfWidth + WALL_INSET
  const innerMaxX = halfWidth - WALL_INSET
  const innerMinZ = -halfDepth + WALL_INSET
  const innerMaxZ = halfDepth - WALL_INSET

  if (x - radius < innerMinX) {
    return z >= ENTRY_Z_START && z <= ENTRY_Z_END
  }

  if (x + radius > innerMaxX) return false
  if (z - radius < innerMinZ) return false
  if (z + radius > innerMaxZ) return false

  return true
}

const sideTableZ = frontZ - 1.5
const sideTableDiameter = 1.3

export const livingRoomFurnitureCollisions: CollisionBox[] = [
  boxFromCenterSize(0, backZ + 1.85, 8, 3.5),
  boxFromRotatedCenterSize(rightX - 2.05, -0.2, 6, 3.5, -Math.PI / 2),
  boxFromRotatedCenterSize(-2.75, frontZ - 1.5, 2.5, 2.5, Math.PI),
  boxFromRotatedCenterSize(2.75, frontZ - 1.5, 2.5, 2.5, Math.PI),
  boxFromCenterSize(0, sideTableZ, sideTableDiameter, sideTableDiameter),
  boxFromCenterSize(0, 0, 3.5, 2),
  boxFromRotatedCenterSize(tvStandX, 0, 5, tvStandDepth, -Math.PI / 2),
]
