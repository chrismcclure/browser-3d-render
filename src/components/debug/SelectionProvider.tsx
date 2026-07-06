import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from 'react'
import type { Object3D } from 'three'
import {
  EMPTY_OBJECT_SELECTION,
  type ObjectSelectionState,
} from '../../types/selectable'
import { getSelectableUserData } from './selectionUtils'

type SelectionContextValue = {
  selection: ObjectSelectionState
  selectedRoot: Object3D | null
  setSelectionFromRaycast: (root: Object3D | null, distance: number | null) => void
}

const SelectionContext = createContext<SelectionContextValue | null>(null)

type SelectionProviderProps = {
  children: ReactNode
}

export function useObjectSelection() {
  const context = useContext(SelectionContext)
  if (!context) {
    throw new Error('useObjectSelection must be used within SelectionProvider')
  }
  return context
}

export default function SelectionProvider({ children }: SelectionProviderProps) {
  const [selection, setSelection] = useState<ObjectSelectionState>(EMPTY_OBJECT_SELECTION)
  const [selectedRoot, setSelectedRoot] = useState<Object3D | null>(null)

  const setSelectionFromRaycast = useCallback((root: Object3D | null, distance: number | null) => {
    if (!root) {
      setSelectedRoot((current) => (current === null ? current : null))
      setSelection((current) =>
        current.name === null ? current : EMPTY_OBJECT_SELECTION,
      )
      return
    }

    const selectable = getSelectableUserData(root)
    if (!selectable) {
      return
    }

    setSelectedRoot((current) => (current === root ? current : root))
    setSelection((current) => {
      if (
        current.name === selectable.debugName &&
        current.distance === distance &&
        current.interactable === selectable.interactable
      ) {
        return current
      }

      return {
        name: selectable.debugName,
        distance,
        interactable: selectable.interactable,
      }
    })
  }, [])

  const value = useMemo(
    () => ({
      selection,
      selectedRoot,
      setSelectionFromRaycast,
    }),
    [selection, selectedRoot, setSelectionFromRaycast],
  )

  return <SelectionContext.Provider value={value}>{children}</SelectionContext.Provider>
}
