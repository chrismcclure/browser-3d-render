import { useCallback, useEffect, useState } from 'react'
import { Canvas } from '@react-three/fiber'
import DeveloperHud, { type PlayerDebugState } from '../debug/DeveloperHud'
import DebugLabelProvider from '../debug/DebugLabelProvider'
import ObjectSelectionRaycaster from '../debug/ObjectSelectionRaycaster'
import SelectionHudBridge from '../debug/SelectionHudBridge'
import SelectionProvider from '../debug/SelectionProvider'
import WorldDebugHelpers from '../debug/WorldDebugHelpers'
import CatChatPanel from '../ui/CatChatPanel'
import InteractionPrompt from '../ui/InteractionPrompt'
import LivingRoomShell from '../house/LivingRoomShell'
import LivingRoomFurniture from '../layouts/LivingRoomFurniture'
import FirstPersonController from '../player/FirstPersonController'
import useCatChat from '../../hooks/useCatChat'
import useDeveloperMode from '../../hooks/useDeveloperMode'
import { CAT_INTERACTION_PROMPT, isPlayerNearCat } from '../../data/catInteraction'
import { DEVELOPER_MODE_AVAILABLE } from '../../debug/developerMode'
import {
  EMPTY_OBJECT_SELECTION,
  type ObjectSelectionState,
} from '../../types/selectable'

export default function WorldScene() {
  const [debugState, setDebugState] = useState<PlayerDebugState | null>(null)
  const [selectionState, setSelectionState] = useState<ObjectSelectionState>(
    EMPTY_OBJECT_SELECTION,
  )
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

  useEffect(() => {
    if (!selectionEnabled) {
      setSelectionState(EMPTY_OBJECT_SELECTION)
    }
  }, [selectionEnabled])

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
        } else if (event.code === 'KeyE' && isNearCat && !chatOpen) {
          openChat()
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

      if (event.code === 'KeyE' && isNearCat && !chatOpen) {
        openChat()
      }
    }

    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [
    chatOpen,
    closeChat,
    developerMode,
    isNearCat,
    openChat,
    toggleDeveloperMode,
    toggleHelpers,
    toggleHud,
    toggleLabels,
  ])

  useEffect(() => {
    if (!isNearCat) {
      closeChat()
    }
  }, [closeChat, isNearCat])

  return (
    <>
      <Canvas>
        <SelectionProvider>
          <DebugLabelProvider visible={labelsVisible}>
            <ambientLight intensity={0.4} />
            <directionalLight position={[5, 5, 5]} intensity={1} />
            {DEVELOPER_MODE_AVAILABLE ? (
              <WorldDebugHelpers visible={helpersVisible} />
            ) : null}
            <LivingRoomShell />
            <LivingRoomFurniture />
            <FirstPersonController controlsEnabled={!chatOpen} onDebugUpdate={setDebugState} />
            {DEVELOPER_MODE_AVAILABLE ? (
              <>
                <ObjectSelectionRaycaster enabled={selectionEnabled && !chatOpen} />
                <SelectionHudBridge onChange={handleSelectionChange} />
              </>
            ) : null}
          </DebugLabelProvider>
        </SelectionProvider>
      </Canvas>
      {chatOpen ? (
        <div
          aria-hidden
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 25,
            cursor: 'default',
          }}
        />
      ) : null}
      {hudVisible ? (
        <DeveloperHud
          state={debugState}
          selection={selectionState}
          developerMode={developerMode}
        />
      ) : null}
      {isNearCat && !chatOpen ? (
        <InteractionPrompt message={CAT_INTERACTION_PROMPT} />
      ) : null}
      {chatOpen ? (
        <CatChatPanel
          messages={messages}
          isLoading={isLoading}
          error={error}
          onSend={sendMessage}
          onClose={closeChat}
        />
      ) : null}
    </>
  )
}
