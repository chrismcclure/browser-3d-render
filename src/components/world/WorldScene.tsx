import { useCallback, useEffect, useState } from 'react'
import { Canvas } from '@react-three/fiber'
import DebugLabelProvider from '../debug/DebugLabelProvider'
import ObjectSelectionRaycaster from '../debug/ObjectSelectionRaycaster'
import SelectionHudBridge from '../debug/SelectionHudBridge'
import SelectionProvider from '../debug/SelectionProvider'
import WorldDebugHelpers from '../debug/WorldDebugHelpers'
import LivingRoomShell from '../house/LivingRoomShell'
import LivingRoomFurniture from '../layouts/LivingRoomFurniture'
import FirstPersonController from '../player/FirstPersonController'
import useCatChat from '../../hooks/useCatChat'
import useDeveloperMode from '../../hooks/useDeveloperMode'
import usePortraitInspection from '../../hooks/usePortraitInspection'
import useWorldInteractionState from '../../hooks/useWorldInteractionState'
import useWorldKeyboard from '../../hooks/useWorldKeyboard'
import { DEVELOPER_MODE_AVAILABLE } from '../../debug/developerMode'
import {
  EMPTY_OBJECT_SELECTION,
  type ObjectSelectionState,
} from '../../types/selectable'
import type { PlayerDebugState } from '../debug/DeveloperHud'
import type { TvScreenMode } from '../../types/tvScreen'
import WorldSceneOverlay from './WorldSceneOverlay'

export default function WorldScene() {
  const [debugState, setDebugState] = useState<PlayerDebugState | null>(null)
  const [selectionState, setSelectionState] = useState<ObjectSelectionState>(
    EMPTY_OBJECT_SELECTION,
  )
  const [tvScreenMode, setTvScreenMode] = useState<TvScreenMode>('off')
  const [catSpinTrigger, setCatSpinTrigger] = useState(0)
  const [catLegRaiseTrigger, setCatLegRaiseTrigger] = useState(0)
  const [catStretchBusy, setCatStretchBusy] = useState(false)
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

  const { canTalkToCat, inspectInteractionActive, tvInteractionActive, interactionPrompt } =
    useWorldInteractionState({
      debugState,
      selectionState,
      tvScreenMode,
    })

  const onCatSpin = useCallback(() => {
    setCatSpinTrigger((current) => current + 1)
  }, [])

  const onCatLegRaise = useCallback(() => {
    setCatLegRaiseTrigger((current) => current + 1)
  }, [])

  const onCatStretchActiveChange = useCallback((active: boolean) => {
    setCatStretchBusy(active)
  }, [])

  const onTvToggle = useCallback(() => {
    setTvScreenMode((current) => (current === 'off' ? 'video-page' : 'off'))
  }, [])

  useWorldKeyboard({
    developerMode,
    modalOpen,
    chatOpen,
    portraitPanelOpen,
    canTalkToCat,
    catStretchBusy,
    inspectInteractionActive,
    tvInteractionActive,
    selectionName: selectionState.name,
    toggleDeveloperMode,
    toggleHud,
    toggleHelpers,
    toggleLabels,
    openChat,
    closeChat,
    openPortraitPanel,
    closePortraitPanel,
    onCatSpin,
    onCatLegRaise,
    onTvToggle,
  })

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
            <LivingRoomFurniture
              tvScreenMode={tvScreenMode}
              catSpinTrigger={catSpinTrigger}
              catLegRaiseTrigger={catLegRaiseTrigger}
              onCatStretchActiveChange={onCatStretchActiveChange}
            />
            <FirstPersonController controlsEnabled={!modalOpen} onDebugUpdate={setDebugState} />
            <ObjectSelectionRaycaster enabled={!modalOpen} />
            <SelectionHudBridge onChange={setSelectionState} />
          </DebugLabelProvider>
        </SelectionProvider>
      </Canvas>
      <WorldSceneOverlay
        modalOpen={modalOpen}
        hudVisible={hudVisible}
        developerMode={developerMode}
        debugState={debugState}
        selectionState={selectionState}
        interactionPrompt={interactionPrompt}
        chatOpen={chatOpen}
        messages={messages}
        chatLoading={isLoading}
        chatError={error}
        onSendMessage={sendMessage}
        onCloseChat={closeChat}
        portraitPanelOpen={portraitPanelOpen}
        activeInspectable={activeInspectable}
        portraitStory={portraitStory}
        portraitLoading={portraitLoading}
        portraitError={portraitError}
        onClosePortraitPanel={closePortraitPanel}
      />
    </div>
  )
}
