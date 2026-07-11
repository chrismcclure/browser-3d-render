import { CAT_INTERACTION_PROMPT } from './catInteraction'

export const INTERACTION_MAX_DISTANCE = 4

export const INTERACTABLE_OBJECTS = {
  PROFESSOR_SPAGHETTIO: 'Professor Spaghettio',
  TV: 'TV',
} as const

export type InteractableObjectName =
  (typeof INTERACTABLE_OBJECTS)[keyof typeof INTERACTABLE_OBJECTS]

export function isWithinInteractionRange(distance: number | null): boolean {
  return distance !== null && distance <= INTERACTION_MAX_DISTANCE
}

type InteractionPromptOptions = {
  tvScreenOn?: boolean
}

export function getInteractionPrompt(
  targetName: string | null,
  options: InteractionPromptOptions = {},
): string | null {
  if (!targetName) {
    return null
  }

  if (targetName === INTERACTABLE_OBJECTS.PROFESSOR_SPAGHETTIO) {
    return CAT_INTERACTION_PROMPT
  }

  if (targetName === INTERACTABLE_OBJECTS.TV) {
    return options.tvScreenOn ? 'Press E to turn off the TV' : 'Press E to turn on the TV'
  }

  return null
}

export function isTvInteractionActive(
  crosshairTarget: string | null,
  crosshairDistance: number | null,
  crosshairInteractable: boolean | null,
): boolean {
  return (
    crosshairTarget === INTERACTABLE_OBJECTS.TV &&
    crosshairInteractable === true &&
    isWithinInteractionRange(crosshairDistance)
  )
}

export function isCatCrosshairInteractionActive(
  crosshairTarget: string | null,
  crosshairDistance: number | null,
  crosshairInteractable: boolean | null,
): boolean {
  return (
    crosshairTarget === INTERACTABLE_OBJECTS.PROFESSOR_SPAGHETTIO &&
    crosshairInteractable === true &&
    isWithinInteractionRange(crosshairDistance)
  )
}
