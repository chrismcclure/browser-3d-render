import { useLayoutEffect, useRef, type ReactNode } from 'react'
import { Group } from 'three'
import type { SelectableObjectProps } from '../../types/selectable'
import { useObjectSelection } from './SelectionProvider'
import useSelectionHighlight from './useSelectionHighlight'

type SelectableRootProps = SelectableObjectProps & {
  children: ReactNode
  position?: [number, number, number]
  rotation?: [number, number, number]
}

export default function SelectableRoot({
  debugName,
  interactable = false,
  children,
  position,
  rotation,
}: SelectableRootProps) {
  const groupRef = useRef<Group>(null)
  const { selectedRoot } = useObjectSelection()
  const isSelected = selectedRoot === groupRef.current

  useLayoutEffect(() => {
    const group = groupRef.current
    if (!group || !debugName) {
      return
    }

    group.userData.selectable = { debugName, interactable }
  }, [debugName, interactable])

  useSelectionHighlight(groupRef, isSelected)

  return (
    <group ref={groupRef} position={position} rotation={rotation}>
      {children}
    </group>
  )
}
