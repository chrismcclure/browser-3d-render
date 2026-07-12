import { useRef } from 'react'
import { Group } from 'three'
import SimpleCat from './SimpleCat'
import useNpcFrontLegRaiseAnimation from '../../npc/useNpcFrontLegRaiseAnimation'
import useNpcSpinAnimation from '../../npc/useNpcSpinAnimation'
import type { DebugNameProps } from '../../types/debug'

type ProfessorSpaghettioProps = DebugNameProps & {
  position?: [number, number, number]
  rotation?: [number, number, number]
  scale?: number | [number, number, number]
  spinTrigger?: number
  legRaiseTrigger?: number
  onStretchActiveChange?: (active: boolean) => void
}

export default function ProfessorSpaghettio({
  debugName,
  position = [0, 0, 0],
  rotation = [0, 0, 0],
  scale = 1,
  spinTrigger = 0,
  legRaiseTrigger = 0,
  onStretchActiveChange,
}: ProfessorSpaghettioProps) {
  const spinGroupRef = useRef<Group>(null)
  const hipPivotRef = useRef<Group>(null)
  const tailPivotRef = useRef<Group>(null)
  const leftShoulderRef = useRef<Group>(null)
  const rightShoulderRef = useRef<Group>(null)
  const scaleVector: [number, number, number] =
    typeof scale === 'number' ? [scale, scale, scale] : scale

  const animateRefs = {
    hipPivot: hipPivotRef,
    tailPivot: tailPivotRef,
    leftShoulder: leftShoulderRef,
    rightShoulder: rightShoulderRef,
  }

  useNpcSpinAnimation(spinGroupRef, { spinTrigger })
  useNpcFrontLegRaiseAnimation({
    ...animateRefs,
    legRaiseTrigger,
    onActiveChange: onStretchActiveChange,
  })

  return (
    <group position={position} rotation={rotation} scale={scaleVector}>
      <group ref={spinGroupRef}>
        <SimpleCat debugName={debugName} animateRefs={animateRefs} />
      </group>
    </group>
  )
}
