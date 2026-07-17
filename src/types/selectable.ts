export type SelectableObjectProps = {
  debugName?: string
  interactable?: boolean
}

export type SelectableUserData = {
  debugName: string
  interactable: boolean
}

export type ObjectSelectionState = {
  name: string | null
  distance: number | null
  interactable: boolean | null
}

export const EMPTY_OBJECT_SELECTION: ObjectSelectionState = {
  name: null,
  distance: null,
  interactable: null,
}
