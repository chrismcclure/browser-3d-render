import {
  PORTRAIT_HISTORY_SYSTEM_PROMPT,
  PORTRAIT_HISTORY_USER_PROMPT,
} from './portraitHistoryPersonality.js'

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

const SUPPORTED_GENERATORS = new Set(['sir-professor-spaghettio-knight'])

export function parseHistoryGeneratorId(value: unknown): string {
  if (!value || typeof value !== 'object' || !('generatorId' in value)) {
    throw new Error('A portrait history generator id is required.')
  }

  const { generatorId } = value as { generatorId?: unknown }

  if (typeof generatorId !== 'string' || !generatorId.trim()) {
    throw new Error('A portrait history generator id is required.')
  }

  const trimmed = generatorId.trim()

  if (!SUPPORTED_GENERATORS.has(trimmed)) {
    throw new Error(`Unknown portrait history generator: ${trimmed}`)
  }

  return trimmed
}

export async function fetchPortraitHistoryFromOpenAI(apiKey: string): Promise<string> {
  if (!apiKey) {
    throw new Error('OPENAI_API_KEY is not configured on the server.')
  }

  const response = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model: 'gpt-4o-mini',
      messages: [
        { role: 'system', content: PORTRAIT_HISTORY_SYSTEM_PROMPT },
        {
          role: 'user',
          content: `${PORTRAIT_HISTORY_USER_PROMPT} Variation seed: ${Date.now()}-${Math.random().toString(36).slice(2)}`,
        },
      ],
      max_tokens: 320,
      temperature: 1,
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
