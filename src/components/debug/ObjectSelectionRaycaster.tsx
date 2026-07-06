import { useFrame, useThree } from '@react-three/fiber'
import { useMemo } from 'react'
import { Raycaster, Vector2 } from 'three'
import { findSelectableRoot } from './selectionUtils'
import { useObjectSelection } from './SelectionProvider'

const CENTER_NDC = new Vector2(0, 0)

type ObjectSelectionRaycasterProps = {
  enabled?: boolean
}

export default function ObjectSelectionRaycaster({
  enabled = true,
}: ObjectSelectionRaycasterProps) {
  const { scene, camera } = useThree()
  const { setSelectionFromRaycast } = useObjectSelection()
  const raycaster = useMemo(() => new Raycaster(), [])

  useFrame(() => {
    if (!enabled) {
      setSelectionFromRaycast(null, null)
      return
    }

    raycaster.setFromCamera(CENTER_NDC, camera)
    const hits = raycaster.intersectObjects(scene.children, true)

    for (const hit of hits) {
      const root = findSelectableRoot(hit.object)
      if (root) {
        setSelectionFromRaycast(root, hit.distance)
        return
      }
    }

    setSelectionFromRaycast(null, null)
  })

  return null
}
