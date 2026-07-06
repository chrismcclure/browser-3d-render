import { useEffect } from 'react'
import type { ObjectSelectionState } from '../../types/selectable'
import { useObjectSelection } from './SelectionProvider'

type SelectionHudBridgeProps = {
  onChange: (selection: ObjectSelectionState) => void
}

export default function SelectionHudBridge({ onChange }: SelectionHudBridgeProps) {
  const { selection } = useObjectSelection()

  useEffect(() => {
    onChange(selection)
  }, [onChange, selection])

  return null
}
