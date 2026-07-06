export type CollisionBox = {
  minX: number
  maxX: number
  minZ: number
  maxZ: number
}

export function boxFromCenterSize(
  centerX: number,
  centerZ: number,
  width: number,
  depth: number,
): CollisionBox {
  const halfWidth = width / 2
  const halfDepth = depth / 2

  return {
    minX: centerX - halfWidth,
    maxX: centerX + halfWidth,
    minZ: centerZ - halfDepth,
    maxZ: centerZ + halfDepth,
  }
}

export function boxFromRotatedCenterSize(
  centerX: number,
  centerZ: number,
  width: number,
  depth: number,
  rotationY: number,
): CollisionBox {
  const halfWidth = width / 2
  const halfDepth = depth / 2
  const corners: [number, number][] = [
    [-halfWidth, -halfDepth],
    [halfWidth, -halfDepth],
    [halfWidth, halfDepth],
    [-halfWidth, halfDepth],
  ]

  const cos = Math.cos(rotationY)
  const sin = Math.sin(rotationY)

  let minX = Infinity
  let maxX = -Infinity
  let minZ = Infinity
  let maxZ = -Infinity

  for (const [localX, localZ] of corners) {
    const worldX = centerX + localX * cos - localZ * sin
    const worldZ = centerZ + localX * sin + localZ * cos
    minX = Math.min(minX, worldX)
    maxX = Math.max(maxX, worldX)
    minZ = Math.min(minZ, worldZ)
    maxZ = Math.max(maxZ, worldZ)
  }

  return { minX, maxX, minZ, maxZ }
}

export function intersectsCircleAABB(
  x: number,
  z: number,
  radius: number,
  box: CollisionBox,
): boolean {
  const closestX = Math.max(box.minX, Math.min(x, box.maxX))
  const closestZ = Math.max(box.minZ, Math.min(z, box.maxZ))
  const deltaX = x - closestX
  const deltaZ = z - closestZ

  return deltaX * deltaX + deltaZ * deltaZ < radius * radius
}

export function collidesAtPosition(
  x: number,
  z: number,
  radius: number,
  boxes: CollisionBox[],
): boolean {
  return boxes.some((box) => intersectsCircleAABB(x, z, radius, box))
}

export function moveWithCollision(
  x: number,
  z: number,
  deltaX: number,
  deltaZ: number,
  radius: number,
  boxes: CollisionBox[],
  isWalkable: (nextX: number, nextZ: number) => boolean,
): { x: number; z: number } {
  let nextX = x + deltaX

  if (
    isWalkable(nextX, z) &&
    !collidesAtPosition(nextX, z, radius, boxes)
  ) {
    x = nextX
  }

  let nextZ = z + deltaZ

  if (
    isWalkable(x, nextZ) &&
    !collidesAtPosition(x, nextZ, radius, boxes)
  ) {
    z = nextZ
  }

  return { x, z }
}
