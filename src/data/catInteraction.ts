import { livingRoomLayout } from '../layouts/livingRoomLayout'

export const CAT_SPIN_KEY = 'F'
export const CAT_SPIN_KEY_CODE = 'KeyF'

export const CAT_INTERACTION_PROMPT = 'Press E to talk to Professor Spaghettio'

export function getCatInteractionPrompt(): string {
  return `Press E to talk\nPress ${CAT_SPIN_KEY} to make Professor Spaghettio spin`
}

export const CAT_CHAT_ERROR_PREFIX = 'Professor Spaghettio flicks his tail and refuses to speak:'

export const CAT_INTERACTION_RADIUS = 4

const [catX, , catZ] = livingRoomLayout.leftChairCat.position
const [chairX, , chairZ] = livingRoomLayout.armchairs[0].position

function isWithinRadius(
  playerX: number,
  playerZ: number,
  targetX: number,
  targetZ: number,
  radius: number,
): boolean {
  const dx = playerX - targetX
  const dz = playerZ - targetZ
  return dx * dx + dz * dz <= radius * radius
}

export function isPlayerNearCat(playerX: number, playerZ: number): boolean {
  const radius = CAT_INTERACTION_RADIUS

  return (
    isWithinRadius(playerX, playerZ, catX, catZ, radius) ||
    isWithinRadius(playerX, playerZ, chairX, chairZ, radius)
  )
}
