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
import LivingRoomShell from '../house/LivingRoomShell'
import LivingRoomFurniture from '../layouts/LivingRoomFurniture'
import FirstPersonController from '../player/FirstPersonController'
import useCatChat from '../../hooks/useCatChat'
import useDeveloperMode from '../../hooks/useDeveloperMode'
import {
  CAT_INTERACTION_PROMPT,
  isPlayerNearCat,
} from '../../data/catInteraction'
import { getInteractionPrompt, isCatCrosshairInteractionActive, isTvInteractionActive } from '../../data/interactions'
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

  const tvInteractionActive =
    !canTalkToCat &&
    isTvInteractionActive(
      selectionState.name,
      selectionState.distance,
      selectionState.interactable,
    )

  const interactionPrompt = canTalkToCat
    ? CAT_INTERACTION_PROMPT
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

      if (!developerMode || chatOpen) {
        if (event.code === 'Escape' && chatOpen) {
          closeChat()
        } else if (event.code === 'KeyE' && canTalkToCat && !chatOpen) {
          openChat()
        } else if (event.code === 'KeyE' && tvInteractionActive && !chatOpen) {
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

      if (event.code === 'Escape' && chatOpen) {
        closeChat()
        return
      }

      if (event.code === 'KeyE' && canTalkToCat && !chatOpen) {
        openChat()
        return
      }

      if (event.code === 'KeyE' && tvInteractionActive && !chatOpen) {
        setTvScreenMode((current) => (current === 'off' ? 'video-page' : 'off'))
      }
    }

    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [
    chatOpen,
    closeChat,
    canTalkToCat,
    developerMode,
    openChat,
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
        <SelectionProvider highlightEnabled={selectionEnabled && !chatOpen}>
          <DebugLabelProvider visible={labelsVisible}>
            <ambientLight intensity={0.4} />
            <directionalLight position={[5, 5, 5]} intensity={1} />
            {DEVELOPER_MODE_AVAILABLE ? (
              <WorldDebugHelpers visible={helpersVisible} />
            ) : null}
            <LivingRoomShell />
            <LivingRoomFurniture tvScreenMode={tvScreenMode} />
            <FirstPersonController controlsEnabled={!chatOpen} onDebugUpdate={setDebugState} />
            <ObjectSelectionRaycaster enabled={!chatOpen} />
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
        <Crosshair visible={!chatOpen} />
        {hudVisible ? (
          <DeveloperHud
            state={debugState}
            selection={selectionState}
            developerMode={developerMode}
          />
        ) : null}
        {interactionPrompt && !chatOpen ? (
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
      </div>
    </div>
  )
}
