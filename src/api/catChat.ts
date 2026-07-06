import type { ChatMessage } from '../types/catChat'

type CatChatResponse = {
  message?: string
  error?: string
}

export async function fetchCatDialogue(messages: ChatMessage[]): Promise<string> {
  const response = await fetch('/api/cat-chat', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      messages: messages.map(({ role, content }) => ({ role, content })),
    }),
  })

  const data = (await response.json()) as CatChatResponse

  if (!response.ok) {
    throw new Error(data.error ?? 'Failed to talk to Professor Spaghettio.')
  }

  if (!data.message) {
    throw new Error('Professor Spaghettio had nothing to say.')
  }

  return data.message
}
