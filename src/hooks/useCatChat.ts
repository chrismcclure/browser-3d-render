import { useCallback, useState } from 'react'
import { fetchCatDialogue } from '../api/catChat'
import { CAT_CHAT_ERROR_PREFIX } from '../data/catInteraction'
import type { ChatMessage } from '../types/catChat'

function createMessage(role: ChatMessage['role'], content: string): ChatMessage {
  return {
    id: crypto.randomUUID(),
    role,
    content,
  }
}

export default function useCatChat() {
  const [chatOpen, setChatOpen] = useState(false)
  const [messages, setMessages] = useState<ChatMessage[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const resetChat = useCallback(() => {
    setMessages([])
    setIsLoading(false)
    setError(null)
  }, [])

  const closeChat = useCallback(() => {
    setChatOpen(false)
    resetChat()
  }, [resetChat])

  const requestReply = useCallback(async (history: ChatMessage[]) => {
    setIsLoading(true)
    setError(null)

    try {
      const reply = await fetchCatDialogue(history)
      setMessages((current) => [...current, createMessage('assistant', reply)])
    } catch (requestError) {
      const detail =
        requestError instanceof Error ? requestError.message : 'Something went wrong.'
      setError(`${CAT_CHAT_ERROR_PREFIX} ${detail}`)
    } finally {
      setIsLoading(false)
    }
  }, [])

  const openChat = useCallback(() => {
    resetChat()
    setChatOpen(true)
    void requestReply([])
  }, [requestReply, resetChat])

  const sendMessage = useCallback(
    (text: string) => {
      const trimmed = text.trim()
      if (!trimmed || isLoading) {
        return
      }

      const userMessage = createMessage('user', trimmed)
      const nextHistory = [...messages, userMessage]

      setMessages(nextHistory)
      void requestReply(nextHistory)
    },
    [isLoading, messages, requestReply],
  )

  return {
    chatOpen,
    messages,
    isLoading,
    error,
    openChat,
    closeChat,
    sendMessage,
  }
}
