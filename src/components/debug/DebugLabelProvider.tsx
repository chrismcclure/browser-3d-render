import { createContext, useContext, type ReactNode } from 'react'

type DebugLabelContextValue = {
  visible: boolean
}

const DebugLabelContext = createContext<DebugLabelContextValue>({ visible: false })

type DebugLabelProviderProps = {
  visible: boolean
  children: ReactNode
}

export function useDebugLabels() {
  return useContext(DebugLabelContext)
}

export default function DebugLabelProvider({ visible, children }: DebugLabelProviderProps) {
  return (
    <DebugLabelContext.Provider value={{ visible }}>{children}</DebugLabelContext.Provider>
  )
}
