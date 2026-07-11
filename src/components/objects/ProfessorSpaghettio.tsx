import { useRef } from 'react'
import { Group } from 'three'
import SimpleCat from './SimpleCat'
import useProfessorSpinAnimation from '../../npc/useProfessorSpinAnimation'
import type { DebugNameProps } from '../../types/debug'

type ProfessorSpaghettioProps = DebugNameProps & {
  position?: [number, number, number]
  rotation?: [number, number, number]
  scale?: number | [number, number, number]
  spinTrigger?: number
}

export default function ProfessorSpaghettio({
  debugName,
  position = [0, 0, 0],
  rotation = [0, 0, 0],
  scale = 1,
  spinTrigger = 0,
}: ProfessorSpaghettioProps) {
  const spinGroupRef = useRef<Group>(null)
  const scaleVector: [number, number, number] =
    typeof scale === 'number' ? [scale, scale, scale] : scale

  useProfessorSpinAnimation(spinGroupRef, { spinTrigger })

  return (
    <group position={position} rotation={rotation} scale={scaleVector}>
      <group ref={spinGroupRef}>
        <SimpleCat debugName={debugName} />
      </group>
    </group>
  )
}
