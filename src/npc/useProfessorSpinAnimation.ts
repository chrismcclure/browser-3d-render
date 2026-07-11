import { useEffect, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import type { RefObject } from 'react'
import type { Group } from 'three'

const SPIN_DURATION = 1.25
const BOB_HEIGHT = 0.06

type UseProfessorSpinAnimationOptions = {
  spinTrigger?: number
}

export default function useProfessorSpinAnimation(
  spinGroupRef: RefObject<Group | null>,
  { spinTrigger = 0 }: UseProfessorSpinAnimationOptions = {},
) {
  const isSpinningRef = useRef(false)
  const spinStartTimeRef = useRef<number | null>(null)
  const lastSpinTriggerRef = useRef(0)

  useEffect(() => {
    if (spinTrigger === 0 || spinTrigger === lastSpinTriggerRef.current) {
      return
    }

    if (isSpinningRef.current) {
      return
    }

    lastSpinTriggerRef.current = spinTrigger
    isSpinningRef.current = true
    spinStartTimeRef.current = null
  }, [spinTrigger])

  useFrame(({ clock }) => {
    const spinGroup = spinGroupRef.current
    if (!spinGroup || !isSpinningRef.current) {
      return
    }

    if (spinStartTimeRef.current === null) {
      spinStartTimeRef.current = clock.getElapsedTime()
    }

    const elapsed = clock.getElapsedTime() - spinStartTimeRef.current
    const progress = Math.min(elapsed / SPIN_DURATION, 1)

    spinGroup.rotation.y = progress * Math.PI * 2
    spinGroup.position.y = -Math.sin(progress * Math.PI) * BOB_HEIGHT

    if (progress >= 1) {
      spinGroup.rotation.y = 0
      spinGroup.position.y = 0
      isSpinningRef.current = false
      spinStartTimeRef.current = null
    }
  })

  return {
    isSpinning: () => isSpinningRef.current,
  }
}
