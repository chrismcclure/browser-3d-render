import type { ChatMessage } from '../types/catChat'

type CatChatResponse = {
  message?: string
  error?: string
}

function parseCatChatResponse(text: string): CatChatResponse {
  if (!text.trim()) {
    throw new Error(
      'The cat chat server returned an empty response. Restart the dev server with npm run dev.',
    )
  }

  try {
    return JSON.parse(text) as CatChatResponse
  } catch {
    throw new Error('The cat chat server returned an invalid response.')
  }
}

export async function fetchCatDialogue(messages: ChatMessage[]): Promise<string> {
  let response: Response

  try {
    response = await fetch('/api/cat-chat', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        messages: messages.map(({ role, content }) => ({ role, content })),
      }),
    })
  } catch {
    throw new Error('Could not reach the cat chat server. Make sure npm run dev is running.')
  }

  const text = await response.text()

  if (!response.ok) {
    if (response.status === 404) {
      throw new Error(
        'The cat chat API is unavailable on this server. Restart the dev server with npm run dev.',
      )
    }

    const data = parseCatChatResponse(text)
    throw new Error(data.error ?? 'Failed to talk to Professor Spaghettio.')
  }

  const data = parseCatChatResponse(text)

  if (!data.message) {
    throw new Error('Professor Spaghettio had nothing to say.')
  }

  return data.message
}
