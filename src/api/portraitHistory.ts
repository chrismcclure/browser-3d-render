type PortraitHistoryResponse = {
  story?: string
  error?: string
}

function parsePortraitHistoryResponse(text: string): PortraitHistoryResponse {
  if (!text.trim()) {
    throw new Error(
      'The portrait history server returned an empty response. Restart the dev server with npm run dev.',
    )
  }

  try {
    return JSON.parse(text) as PortraitHistoryResponse
  } catch {
    throw new Error('The portrait history server returned an invalid response.')
  }
}

export async function fetchPortraitHistory(generatorId: string): Promise<string> {
  let response: Response

  try {
    response = await fetch('/api/portrait-history', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ generatorId }),
    })
  } catch {
    throw new Error(
      'Could not reach the portrait history server. Make sure npm run dev is running.',
    )
  }

  const text = await response.text()

  if (!response.ok) {
    if (response.status === 404) {
      throw new Error(
        'The portrait history API is unavailable on this server. Restart the dev server with npm run dev.',
      )
    }

    const data = parsePortraitHistoryResponse(text)
    throw new Error(data.error ?? 'Failed to read the portrait history.')
  }

  const data = parsePortraitHistoryResponse(text)

  if (!data.story) {
    throw new Error('The museum placard returned no history.')
  }

  return data.story
}
