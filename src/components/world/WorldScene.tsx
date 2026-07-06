import { useEffect, useState } from 'react'
import { Canvas } from '@react-three/fiber'
import DeveloperHud, { type PlayerDebugState } from '../debug/DeveloperHud'
import CatChatPanel from '../ui/CatChatPanel'
import InteractionPrompt from '../ui/InteractionPrompt'
import LivingRoomShell from '../house/LivingRoomShell'
import LivingRoomFurniture from '../layouts/LivingRoomFurniture'
import FirstPersonController from '../player/FirstPersonController'
import useCatChat from '../../hooks/useCatChat'
import { CAT_INTERACTION_PROMPT, isPlayerNearCat } from '../../data/catInteraction'

const DEFAULT_HUD_VISIBLE = import.meta.env.DEV

export default function WorldScene() {
  const [debugState, setDebugState] = useState<PlayerDebugState | null>(null)
  const [hudVisible, setHudVisible] = useState(DEFAULT_HUD_VISIBLE)
  const { chatOpen, messages, isLoading, error, openChat, closeChat, sendMessage } = useCatChat()

  const isNearCat =
    debugState !== null &&
    isPlayerNearCat(debugState.position[0], debugState.position[2])

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.code === 'KeyH' && !chatOpen) {
        setHudVisible((visible) => !visible)
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
  }, [chatOpen, closeChat, isNearCat, openChat])

  useEffect(() => {
    if (!isNearCat) {
      closeChat()
    }
  }, [closeChat, isNearCat])

  return (
    <>
      <Canvas>
        <ambientLight intensity={0.4} />
        <directionalLight position={[5, 5, 5]} intensity={1} />
        <LivingRoomShell />
        <LivingRoomFurniture />
        <FirstPersonController controlsEnabled={!chatOpen} onDebugUpdate={setDebugState} />
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
      {hudVisible ? <DeveloperHud state={debugState} /> : null}
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
