import DeveloperHud, { type PlayerDebugState } from '../debug/DeveloperHud'
import CatChatPanel from '../ui/CatChatPanel'
import Crosshair from '../ui/Crosshair'
import InteractionPrompt from '../ui/InteractionPrompt'
import ModalBackdrop from '../ui/ModalBackdrop'
import PortraitHistoryPanel from '../ui/PortraitHistoryPanel'
import type { ChatMessage } from '../../types/catChat'
import type { InspectableConfig } from '../../types/inspection'
import type { ObjectSelectionState } from '../../types/selectable'

type WorldSceneOverlayProps = {
  modalOpen: boolean
  hudVisible: boolean
  developerMode: boolean
  debugState: PlayerDebugState | null
  selectionState: ObjectSelectionState
  interactionPrompt: string | null
  chatOpen: boolean
  messages: ChatMessage[]
  chatLoading: boolean
  chatError: string | null
  onSendMessage: (text: string) => void
  onCloseChat: () => void
  portraitPanelOpen: boolean
  activeInspectable: InspectableConfig | null
  portraitStory: string | null
  portraitLoading: boolean
  portraitError: string | null
  onClosePortraitPanel: () => void
}

export default function WorldSceneOverlay({
  modalOpen,
  hudVisible,
  developerMode,
  debugState,
  selectionState,
  interactionPrompt,
  chatOpen,
  messages,
  chatLoading,
  chatError,
  onSendMessage,
  onCloseChat,
  portraitPanelOpen,
  activeInspectable,
  portraitStory,
  portraitLoading,
  portraitError,
  onClosePortraitPanel,
}: WorldSceneOverlayProps) {
  return (
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
          <ModalBackdrop />
          <CatChatPanel
            messages={messages}
            isLoading={chatLoading}
            error={chatError}
            onSend={onSendMessage}
            onClose={onCloseChat}
          />
        </>
      ) : null}
      {portraitPanelOpen && activeInspectable ? (
        <>
          <ModalBackdrop />
          <PortraitHistoryPanel
            title={activeInspectable.panelTitle}
            story={portraitStory}
            isLoading={portraitLoading}
            error={portraitError}
            onClose={onClosePortraitPanel}
          />
        </>
      ) : null}
    </div>
  )
}
