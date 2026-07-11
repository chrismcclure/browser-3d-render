import { useEffect } from 'react'
import { CAT_SPIN_KEY_CODE } from '../data/catInteraction'
import { getInspectableByDisplayName } from '../data/inspectables'
import { DEVELOPER_MODE_AVAILABLE } from '../debug/developerMode'
import type { InspectableConfig } from '../types/inspection'

type UseWorldKeyboardParams = {
  developerMode: boolean
  modalOpen: boolean
  chatOpen: boolean
  portraitPanelOpen: boolean
  canTalkToCat: boolean
  inspectInteractionActive: boolean
  tvInteractionActive: boolean
  selectionName: string | null
  toggleDeveloperMode: () => void
  toggleHud: () => void
  toggleHelpers: () => void
  toggleLabels: () => void
  openChat: () => void
  closeChat: () => void
  openPortraitPanel: (inspectable: InspectableConfig) => Promise<void>
  closePortraitPanel: () => void
  onCatSpin: () => void
  onTvToggle: () => void
}

export default function useWorldKeyboard({
  developerMode,
  modalOpen,
  chatOpen,
  portraitPanelOpen,
  canTalkToCat,
  inspectInteractionActive,
  tvInteractionActive,
  selectionName,
  toggleDeveloperMode,
  toggleHud,
  toggleHelpers,
  toggleLabels,
  openChat,
  closeChat,
  openPortraitPanel,
  closePortraitPanel,
  onCatSpin,
  onTvToggle,
}: UseWorldKeyboardParams) {
  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (DEVELOPER_MODE_AVAILABLE && event.code === 'F3') {
        event.preventDefault()
        toggleDeveloperMode()
        return
      }

      if (event.code === 'Escape' && portraitPanelOpen) {
        closePortraitPanel()
        return
      }

      if (event.code === 'Escape' && chatOpen) {
        closeChat()
        return
      }

      if (!modalOpen) {
        if (event.code === 'KeyE' && canTalkToCat) {
          openChat()
          return
        }

        if (event.code === CAT_SPIN_KEY_CODE && canTalkToCat) {
          onCatSpin()
          return
        }

        if (event.code === 'KeyE' && inspectInteractionActive) {
          const inspectable = getInspectableByDisplayName(selectionName)
          if (inspectable) {
            void openPortraitPanel(inspectable)
          }
          return
        }

        if (event.code === 'KeyE' && tvInteractionActive) {
          onTvToggle()
          return
        }
      }

      if (developerMode && !modalOpen) {
        if (event.code === 'KeyH') {
          toggleHud()
          return
        }

        if (event.code === 'KeyG') {
          toggleHelpers()
          return
        }

        if (event.code === 'KeyL') {
          toggleLabels()
          return
        }
      }
    }

    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [
    canTalkToCat,
    chatOpen,
    closeChat,
    closePortraitPanel,
    developerMode,
    inspectInteractionActive,
    modalOpen,
    onCatSpin,
    onTvToggle,
    openChat,
    openPortraitPanel,
    portraitPanelOpen,
    selectionName,
    toggleDeveloperMode,
    toggleHelpers,
    toggleHud,
    toggleLabels,
    tvInteractionActive,
  ])
}
