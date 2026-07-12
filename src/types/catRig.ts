import type { RefObject } from 'react'
import type { Group } from 'three'

export type CatAnimateRefs = {
  hipPivot: RefObject<Group | null>
  tailPivot: RefObject<Group | null>
  leftShoulder: RefObject<Group | null>
  rightShoulder: RefObject<Group | null>
}
