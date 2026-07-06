import { useEffect, type RefObject } from 'react'
import { Color, Group, Mesh, MeshStandardMaterial } from 'three'

const HIGHLIGHT_EMISSIVE = new Color('#6a8cff')
const HIGHLIGHT_INTENSITY = 0.22

type MaterialSnapshot = {
  emissive: Color
  emissiveIntensity: number
}

function getMeshMaterials(mesh: Mesh): MeshStandardMaterial[] {
  if (!mesh.material) {
    return []
  }

  return (Array.isArray(mesh.material) ? mesh.material : [mesh.material]).filter(
    (material): material is MeshStandardMaterial =>
      material instanceof MeshStandardMaterial,
  )
}

function restoreSelectionTint(group: Group) {
  group.traverse((object) => {
    if (!(object instanceof Mesh)) {
      return
    }

    const snapshot = object.userData.selectionMaterialSnapshot as
      | MaterialSnapshot[]
      | undefined
    if (!snapshot) {
      return
    }

    const materials = getMeshMaterials(object)
    materials.forEach((material, index) => {
      const saved = snapshot[index]
      if (!saved) {
        return
      }
      material.emissive.copy(saved.emissive)
      material.emissiveIntensity = saved.emissiveIntensity
    })

    delete object.userData.selectionMaterialSnapshot
  })
}

function applySelectionTint(group: Group) {
  group.traverse((object) => {
    if (!(object instanceof Mesh)) {
      return
    }

    const materials = getMeshMaterials(object)
    if (materials.length === 0) {
      return
    }

    if (!object.userData.selectionMaterialSnapshot) {
      object.userData.selectionMaterialSnapshot = materials.map((material) => ({
        emissive: material.emissive.clone(),
        emissiveIntensity: material.emissiveIntensity,
      })) satisfies MaterialSnapshot[]
    }

    materials.forEach((material) => {
      material.emissive.copy(HIGHLIGHT_EMISSIVE)
      material.emissiveIntensity = HIGHLIGHT_INTENSITY
    })
  })
}

export default function useSelectionHighlight(
  groupRef: RefObject<Group | null>,
  active: boolean,
) {
  useEffect(() => {
    const group = groupRef.current
    if (!group) {
      return
    }

    if (active) {
      applySelectionTint(group)
    } else {
      restoreSelectionTint(group)
    }

    return () => {
      restoreSelectionTint(group)
    }
  }, [active, groupRef])
}
