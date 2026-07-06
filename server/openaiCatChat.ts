import { CAT_OPENING_PROMPT, CAT_SYSTEM_PROMPT } from './catPersonality.js'

type ConversationMessage = {
  role: 'user' | 'assistant'
  content: string
}

type OpenAIChatResponse = {
  choices?: Array<{
    message?: {
      content?: string
    }
  }>
  error?: {
    message?: string
  }
}

export function parseConversationMessages(value: unknown): ConversationMessage[] {
  if (!value || typeof value !== 'object' || !('messages' in value)) {
    return []
  }

  const { messages } = value as { messages?: unknown }

  if (!Array.isArray(messages)) {
    return []
  }

  return messages.flatMap((message) => {
    if (!message || typeof message !== 'object') {
      return []
    }

    const { role, content } = message as { role?: unknown; content?: unknown }

    if ((role !== 'user' && role !== 'assistant') || typeof content !== 'string') {
      return []
    }

    const trimmed = content.trim()
    if (!trimmed) {
      return []
    }

    return [{ role, content: trimmed }]
  })
}

export async function fetchCatDialogueFromOpenAI(
  apiKey: string,
  messages: ConversationMessage[],
): Promise<string> {
  if (!apiKey) {
    throw new Error('OPENAI_API_KEY is not configured on the server.')
  }

  const conversationMessages =
    messages.length > 0
      ? messages.map((message) => ({
          role: message.role,
          content: message.content,
        }))
      : [{ role: 'user' as const, content: CAT_OPENING_PROMPT }]

  const response = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model: 'gpt-4o-mini',
      messages: [{ role: 'system', content: CAT_SYSTEM_PROMPT }, ...conversationMessages],
      max_tokens: 120,
      temperature: 0.9,
    }),
  })

  const data = (await response.json()) as OpenAIChatResponse

  if (!response.ok) {
    throw new Error(data.error?.message ?? `OpenAI request failed with status ${response.status}.`)
  }

  const content = data.choices?.[0]?.message?.content?.trim()

  if (!content) {
    throw new Error('OpenAI returned an empty response.')
  }

  return content
}
