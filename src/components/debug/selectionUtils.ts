import type { Object3D } from 'three'
import type { SelectableUserData } from '../../types/selectable'

export function findSelectableRoot(object: Object3D): Object3D | null {
  let current: Object3D | null = object

  while (current) {
    const selectable = current.userData.selectable as SelectableUserData | undefined
    if (selectable?.debugName) {
      return current
    }
    current = current.parent
  }

  return null
}

export function getSelectableUserData(object: Object3D): SelectableUserData | null {
  const selectable = object.userData.selectable as SelectableUserData | undefined
  if (!selectable?.debugName) {
    return null
  }
  return selectable
}
