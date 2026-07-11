import { useCallback, useState } from 'react'
import { fetchPortraitHistory } from '../api/portraitHistory'
import type { InspectableConfig } from '../types/inspection'

export const PORTRAIT_HISTORY_ERROR_PREFIX =
  'The museum placard could not be deciphered:'

export default function usePortraitInspection() {
  const [panelOpen, setPanelOpen] = useState(false)
  const [activeInspectable, setActiveInspectable] = useState<InspectableConfig | null>(null)
  const [story, setStory] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const resetPanel = useCallback(() => {
    setStory(null)
    setIsLoading(false)
    setError(null)
  }, [])

  const closePanel = useCallback(() => {
    setPanelOpen(false)
    setActiveInspectable(null)
    resetPanel()
  }, [resetPanel])

  const openPanel = useCallback(
    async (inspectable: InspectableConfig) => {
      resetPanel()
      setActiveInspectable(inspectable)
      setPanelOpen(true)
      setIsLoading(true)

      try {
        const generatedStory = await fetchPortraitHistory(inspectable.historyGeneratorId)
        setStory(generatedStory)
      } catch (requestError) {
        const detail =
          requestError instanceof Error ? requestError.message : 'Something went wrong.'
        setError(`${PORTRAIT_HISTORY_ERROR_PREFIX} ${detail}`)
      } finally {
        setIsLoading(false)
      }
    },
    [resetPanel],
  )

  return {
    panelOpen,
    activeInspectable,
    story,
    isLoading,
    error,
    openPanel,
    closePanel,
  }
}
