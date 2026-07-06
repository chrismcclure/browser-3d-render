import { livingRoomLayout } from '../layouts/livingRoomLayout'

export const CAT_INTERACTION_PROMPT = 'Press E to talk to Professor Spaghettio'

export const CAT_CHAT_ERROR_PREFIX = 'Professor Spaghettio flicks his tail and refuses to speak:'

export const CAT_INTERACTION_RADIUS = 2.75

const [catX, , catZ] = livingRoomLayout.leftChairCat.position

export function isPlayerNearCat(playerX: number, playerZ: number): boolean {
  const dx = playerX - catX
  const dz = playerZ - catZ
  return dx * dx + dz * dz <= CAT_INTERACTION_RADIUS * CAT_INTERACTION_RADIUS
}
