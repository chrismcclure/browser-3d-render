import { useCallback, useMemo, useState } from 'react'
import {
  ALL_DEVELOPER_TOOLS_OFF,
  ALL_DEVELOPER_TOOLS_ON,
  type DeveloperToolFlags,
} from '../debug/developerMode'

export default function useDeveloperMode() {
  const [developerMode, setDeveloperMode] = useState(false)
  const [tools, setTools] = useState<DeveloperToolFlags>(ALL_DEVELOPER_TOOLS_OFF)

  const toggleDeveloperMode = useCallback(() => {
    setDeveloperMode((current) => {
      const next = !current
      setTools(next ? ALL_DEVELOPER_TOOLS_ON : ALL_DEVELOPER_TOOLS_OFF)
      return next
    })
  }, [])

  const toggleHud = useCallback(() => {
    setTools((current) => ({ ...current, hud: !current.hud }))
  }, [])

  const toggleHelpers = useCallback(() => {
    setTools((current) => ({ ...current, helpers: !current.helpers }))
  }, [])

  const toggleLabels = useCallback(() => {
    setTools((current) => ({ ...current, labels: !current.labels }))
  }, [])

  const activeTools = useMemo(
    () =>
      developerMode
        ? tools
        : {
            hud: false,
            helpers: false,
            labels: false,
          },
    [developerMode, tools],
  )

  return {
    developerMode,
    toggleDeveloperMode,
    toggleHud,
    toggleHelpers,
    toggleLabels,
    hudVisible: activeTools.hud,
    helpersVisible: activeTools.helpers,
    labelsVisible: activeTools.labels,
    selectionEnabled: developerMode,
  }
}
