import { useEffect, useRef, useState, type FormEvent, type KeyboardEvent } from 'react'
import type { ChatMessage } from '../../types/catChat'

type CatChatPanelProps = {
  messages: ChatMessage[]
  isLoading: boolean
  error: string | null
  onSend: (message: string) => void
  onClose: () => void
}

export default function CatChatPanel({
  messages,
  isLoading,
  error,
  onSend,
  onClose,
}: CatChatPanelProps) {
  const [draft, setDraft] = useState('')
  const messagesEndRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, isLoading, error])

  const submitMessage = () => {
    const trimmed = draft.trim()
    if (!trimmed || isLoading) {
      return
    }

    onSend(trimmed)
    setDraft('')
  }

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault()
    submitMessage()
  }

  const handleInputKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      event.preventDefault()
      submitMessage()
    }
  }

  return (
    <div
      style={{
        position: 'fixed',
        bottom: 48,
        left: '50%',
        transform: 'translateX(-50%)',
        zIndex: 30,
        width: 'min(460px, calc(100vw - 32px))',
        padding: '14px 16px',
        borderRadius: 8,
        background: 'rgba(0, 0, 0, 0.84)',
        color: '#f3f3f3',
        fontFamily: 'ui-monospace, SFMono-Regular, Menlo, monospace',
        fontSize: 13,
        lineHeight: 1.5,
        boxShadow: '0 8px 24px rgba(0, 0, 0, 0.35)',
        pointerEvents: 'auto',
      }}
    >
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginBottom: 10,
        }}
      >
        <div style={{ fontWeight: 600, color: '#f0b878' }}>Professor Spaghettio</div>
        <button
          type="button"
          onClick={onClose}
          style={{
            padding: '4px 10px',
            borderRadius: 4,
            border: '1px solid rgba(255, 255, 255, 0.2)',
            background: 'rgba(255, 255, 255, 0.08)',
            color: '#f3f3f3',
            fontFamily: 'inherit',
            fontSize: 12,
            cursor: 'pointer',
          }}
        >
          Close
        </button>
      </div>

      <div
        style={{
          maxHeight: 240,
          overflowY: 'auto',
          marginBottom: 12,
          paddingRight: 4,
          display: 'flex',
          flexDirection: 'column',
          gap: 8,
        }}
      >
        {messages.map((message) => (
          <div
            key={message.id}
            style={{
              alignSelf: message.role === 'user' ? 'flex-end' : 'flex-start',
              maxWidth: '85%',
              padding: '8px 10px',
              borderRadius: 6,
              background:
                message.role === 'user'
                  ? 'rgba(255, 255, 255, 0.12)'
                  : 'rgba(240, 184, 120, 0.16)',
              border:
                message.role === 'user'
                  ? '1px solid rgba(255, 255, 255, 0.12)'
                  : '1px solid rgba(240, 184, 120, 0.24)',
            }}
          >
            <div
              style={{
                fontSize: 11,
                opacity: 0.75,
                marginBottom: 4,
              }}
            >
              {message.role === 'user' ? 'You' : 'Professor Spaghettio'}
            </div>
            <div>{message.content}</div>
          </div>
        ))}

        {isLoading ? (
          <div style={{ opacity: 0.75, fontSize: 12 }}>
            Professor Spaghettio is composing a reply...
          </div>
        ) : null}

        {error ? (
          <div style={{ color: '#ffb4ab', fontSize: 12 }}>{error}</div>
        ) : null}

        <div ref={messagesEndRef} />
      </div>

      <form onSubmit={handleSubmit} style={{ display: 'flex', gap: 8 }}>
        <input
          type="text"
          value={draft}
          autoFocus
          onChange={(event) => setDraft(event.target.value)}
          onKeyDown={handleInputKeyDown}
          placeholder="Say something to the professor..."
          disabled={isLoading}
          style={{
            flex: 1,
            padding: '8px 10px',
            borderRadius: 4,
            border: '1px solid rgba(255, 255, 255, 0.18)',
            background: 'rgba(255, 255, 255, 0.08)',
            color: '#f3f3f3',
            fontFamily: 'inherit',
            fontSize: 12,
          }}
        />
        <button
          type="submit"
          disabled={isLoading || !draft.trim()}
          style={{
            padding: '8px 12px',
            borderRadius: 4,
            border: '1px solid rgba(255, 255, 255, 0.2)',
            background: 'rgba(255, 255, 255, 0.12)',
            color: '#f3f3f3',
            fontFamily: 'inherit',
            fontSize: 12,
            cursor: isLoading || !draft.trim() ? 'not-allowed' : 'pointer',
            opacity: isLoading || !draft.trim() ? 0.6 : 1,
          }}
        >
          Send
        </button>
      </form>
    </div>
  )
}
