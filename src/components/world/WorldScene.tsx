import { useCallback, useEffect, useState } from 'react'
import { Canvas } from '@react-three/fiber'
import DeveloperHud, { type PlayerDebugState } from '../debug/DeveloperHud'
import DebugLabelProvider from '../debug/DebugLabelProvider'
import ObjectSelectionRaycaster from '../debug/ObjectSelectionRaycaster'
import SelectionHudBridge from '../debug/SelectionHudBridge'
import SelectionProvider from '../debug/SelectionProvider'
import WorldDebugHelpers from '../debug/WorldDebugHelpers'
import CatChatPanel from '../ui/CatChatPanel'
import Crosshair from '../ui/Crosshair'
import InteractionPrompt from '../ui/InteractionPrompt'
import PortraitHistoryPanel from '../ui/PortraitHistoryPanel'
import LivingRoomShell from '../house/LivingRoomShell'
import LivingRoomFurniture from '../layouts/LivingRoomFurniture'
import FirstPersonController from '../player/FirstPersonController'
import useCatChat from '../../hooks/useCatChat'
import useDeveloperMode from '../../hooks/useDeveloperMode'
import usePortraitInspection from '../../hooks/usePortraitInspection'
import {
  CAT_SPIN_KEY_CODE,
  getCatInteractionPrompt,
  isPlayerNearCat,
} from '../../data/catInteraction'
import { getInspectableByDisplayName } from '../../data/inspectables'
import {
  getInteractionPrompt,
  isCatCrosshairInteractionActive,
  isInspectInteractionActive,
  isTvInteractionActive,
} from '../../data/interactions'
import { DEVELOPER_MODE_AVAILABLE } from '../../debug/developerMode'
import {
  EMPTY_OBJECT_SELECTION,
  type ObjectSelectionState,
} from '../../types/selectable'
import type { TvScreenMode } from '../../types/tvScreen'

export default function WorldScene() {
  const [debugState, setDebugState] = useState<PlayerDebugState | null>(null)
  const [selectionState, setSelectionState] = useState<ObjectSelectionState>(
    EMPTY_OBJECT_SELECTION,
  )
  const [tvScreenMode, setTvScreenMode] = useState<TvScreenMode>('video-page')
  const [catSpinTrigger, setCatSpinTrigger] = useState(0)
  const {
    developerMode,
    toggleDeveloperMode,
    toggleHud,
    toggleHelpers,
    toggleLabels,
    hudVisible,
    helpersVisible,
    labelsVisible,
    selectionEnabled,
  } = useDeveloperMode()
  const { chatOpen, messages, isLoading, error, openChat, closeChat, sendMessage } = useCatChat()
  const {
    panelOpen: portraitPanelOpen,
    activeInspectable,
    story: portraitStory,
    isLoading: portraitLoading,
    error: portraitError,
    openPanel: openPortraitPanel,
    closePanel: closePortraitPanel,
  } = usePortraitInspection()

  const modalOpen = chatOpen || portraitPanelOpen

  const handleSelectionChange = useCallback((selection: ObjectSelectionState) => {
    setSelectionState(selection)
  }, [])

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

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (DEVELOPER_MODE_AVAILABLE && event.code === 'F3') {
        event.preventDefault()
        toggleDeveloperMode()
        return
      }

      if (!developerMode || modalOpen) {
        if (event.code === 'Escape' && portraitPanelOpen) {
          closePortraitPanel()
        } else if (event.code === 'Escape' && chatOpen) {
          closeChat()
        } else if (event.code === 'KeyE' && canTalkToCat && !modalOpen) {
          openChat()
        } else if (event.code === CAT_SPIN_KEY_CODE && canTalkToCat && !modalOpen) {
          setCatSpinTrigger((current) => current + 1)
        } else if (event.code === 'KeyE' && inspectInteractionActive && !modalOpen) {
          const inspectable = getInspectableByDisplayName(selectionState.name)
          if (inspectable) {
            void openPortraitPanel(inspectable)
          }
        } else if (event.code === 'KeyE' && tvInteractionActive && !modalOpen) {
          setTvScreenMode((current) => (current === 'off' ? 'video-page' : 'off'))
        }
        return
      }

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

      if (event.code === 'Escape' && portraitPanelOpen) {
        closePortraitPanel()
        return
      }

      if (event.code === 'Escape' && chatOpen) {
        closeChat()
        return
      }

      if (event.code === 'KeyE' && canTalkToCat && !modalOpen) {
        openChat()
        return
      }

      if (event.code === CAT_SPIN_KEY_CODE && canTalkToCat && !modalOpen) {
        setCatSpinTrigger((current) => current + 1)
        return
      }

      if (event.code === 'KeyE' && inspectInteractionActive && !modalOpen) {
        const inspectable = getInspectableByDisplayName(selectionState.name)
        if (inspectable) {
          void openPortraitPanel(inspectable)
        }
        return
      }

      if (event.code === 'KeyE' && tvInteractionActive && !modalOpen) {
        setTvScreenMode((current) => (current === 'off' ? 'video-page' : 'off'))
      }
    }

    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [
    chatOpen,
    closeChat,
    closePortraitPanel,
    canTalkToCat,
    developerMode,
    inspectInteractionActive,
    modalOpen,
    openChat,
    openPortraitPanel,
    portraitPanelOpen,
    selectionState.name,
    toggleDeveloperMode,
    toggleHelpers,
    toggleHud,
    toggleLabels,
    tvInteractionActive,
  ])

  useEffect(() => {
    if (!canTalkToCat) {
      closeChat()
    }
  }, [canTalkToCat, closeChat])

  return (
    <div style={{ position: 'fixed', inset: 0, overflow: 'hidden' }}>
      <Canvas style={{ position: 'absolute', inset: 0, zIndex: 0 }}>
        <SelectionProvider highlightEnabled={selectionEnabled && !modalOpen}>
          <DebugLabelProvider visible={labelsVisible}>
            <ambientLight intensity={0.4} />
            <directionalLight position={[5, 5, 5]} intensity={1} />
            {DEVELOPER_MODE_AVAILABLE ? (
              <WorldDebugHelpers visible={helpersVisible} />
            ) : null}
            <LivingRoomShell />
            <LivingRoomFurniture tvScreenMode={tvScreenMode} catSpinTrigger={catSpinTrigger} />
            <FirstPersonController controlsEnabled={!modalOpen} onDebugUpdate={setDebugState} />
            <ObjectSelectionRaycaster enabled={!modalOpen} />
            <SelectionHudBridge onChange={handleSelectionChange} />
          </DebugLabelProvider>
        </SelectionProvider>
      </Canvas>
      <div
        style={{
          position: 'absolute',
          inset: 0,
          zIndex: 1,
          pointerEvents: 'none',
        }}
      >
        <Crosshair visible={!modalOpen} />
        {hudVisible ? (
          <DeveloperHud
            state={debugState}
            selection={selectionState}
            developerMode={developerMode}
          />
        ) : null}
        {interactionPrompt && !modalOpen ? (
          <InteractionPrompt message={interactionPrompt} />
        ) : null}
        {chatOpen ? (
          <>
            <div
              aria-hidden
              style={{
                position: 'absolute',
                inset: 0,
                zIndex: 25,
                cursor: 'default',
                pointerEvents: 'auto',
              }}
            />
            <CatChatPanel
              messages={messages}
              isLoading={isLoading}
              error={error}
              onSend={sendMessage}
              onClose={closeChat}
            />
          </>
        ) : null}
        {portraitPanelOpen && activeInspectable ? (
          <>
            <div
              aria-hidden
              style={{
                position: 'absolute',
                inset: 0,
                zIndex: 25,
                cursor: 'default',
                pointerEvents: 'auto',
              }}
            />
            <PortraitHistoryPanel
              title={activeInspectable.panelTitle}
              story={portraitStory}
              isLoading={portraitLoading}
              error={portraitError}
              onClose={closePortraitPanel}
            />
          </>
        ) : null}
      </div>
    </div>
  )
}
