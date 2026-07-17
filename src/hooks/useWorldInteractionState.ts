import { getCatInteractionPrompt, isPlayerNearCat } from '../data/catInteraction'
import {
  getInteractionPrompt,
  isCatCrosshairInteractionActive,
  isInspectInteractionActive,
  isTvInteractionActive,
} from '../data/interactions'
import type { PlayerDebugState } from '../components/debug/DeveloperHud'
import type { ObjectSelectionState } from '../types/selectable'
import type { TvScreenMode } from '../types/tvScreen'

type UseWorldInteractionStateParams = {
  debugState: PlayerDebugState | null
  selectionState: ObjectSelectionState
  tvScreenMode: TvScreenMode
}

export default function useWorldInteractionState({
  debugState,
  selectionState,
  tvScreenMode,
}: UseWorldInteractionStateParams) {
  const isNearCat =
    debugState !== null &&
    isPlayerNearCat(debugState.position[0], debugState.position[2])

  const isCatCrosshairTarget = isCatCrosshairInteractionActive(
    selectionState.name,
    selectionState.distance,
    selectionState.interactable,
  )

  const canTalkToCat = isNearCat || isCatCrosshairTarget

  const inspectInteractionActive =
    !canTalkToCat &&
    isInspectInteractionActive(
      selectionState.name,
      selectionState.distance,
      selectionState.interactable,
    )

  const tvInteractionActive =
    !canTalkToCat &&
    !inspectInteractionActive &&
    isTvInteractionActive(
      selectionState.name,
      selectionState.distance,
      selectionState.interactable,
    )

  const interactionPrompt = canTalkToCat
    ? getCatInteractionPrompt()
    : inspectInteractionActive
      ? getInteractionPrompt(selectionState.name)
      : getInteractionPrompt(tvInteractionActive ? selectionState.name : null, {
          tvScreenOn: tvScreenMode !== 'off',
        })

  return {
    canTalkToCat,
    inspectInteractionActive,
    tvInteractionActive,
    interactionPrompt,
  }
}
