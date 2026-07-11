import type { InspectableConfig } from '../types/inspection'

export const INSPECTABLE_OBJECTS = {
  KNIGHT_PORTRAIT: 'Portrait of Sir Professor Spaghettio',
} as const

export type InspectableObjectName =
  (typeof INSPECTABLE_OBJECTS)[keyof typeof INSPECTABLE_OBJECTS]

export const INSPECTABLES: Record<InspectableObjectName, InspectableConfig> = {
  [INSPECTABLE_OBJECTS.KNIGHT_PORTRAIT]: {
    displayName: INSPECTABLE_OBJECTS.KNIGHT_PORTRAIT,
    interactionType: 'inspect',
    interactionPrompt: 'Press E to read the portrait history',
    historyGeneratorId: 'sir-professor-spaghettio-knight',
    panelTitle: 'Portrait of Sir Professor Spaghettio',
  },
}

export function getInspectableByDisplayName(
  displayName: string | null,
): InspectableConfig | null {
  if (!displayName) {
    return null
  }

  return INSPECTABLES[displayName as InspectableObjectName] ?? null
}
