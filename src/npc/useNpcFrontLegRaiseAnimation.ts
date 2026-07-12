import { useEffect, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import type { CatAnimateRefs } from '../types/catRig'

const RAISE_DURATION = 1
const HOLD_DURATION = 0.5
const RETURN_DURATION = 1
const LEG_ABOVE_HORIZONTAL_DEG = -12
const FULL_STRETCH_HIP_ANGLE = 0.76
// Cat local forward is -Z. Positive shoulder X rotates the downward legs toward -Z.
const LEG_RAISE_ANGLE = Math.PI / 2 - (LEG_ABOVE_HORIZONTAL_DEG * Math.PI) / 180
const HIP_LOWER_ANGLE = FULL_STRETCH_HIP_ANGLE * 0.4
const TAIL_LIFT_ANGLE = 0.34

type StretchPhase = 'idle' | 'raising' | 'holding' | 'returning'

type UseNpcFrontLegRaiseAnimationOptions = {
  legRaiseTrigger?: number
  onActiveChange?: (active: boolean) => void
}

function smoothstep(value: number): number {
  const t = Math.max(0, Math.min(1, value))
  return t * t * (3 - 2 * t)
}

function applyRaisePose(refs: CatAnimateRefs, amount: number): void {
  const hipPivot = refs.hipPivot.current
  const tailPivot = refs.tailPivot.current
  const leftShoulder = refs.leftShoulder.current
  const rightShoulder = refs.rightShoulder.current

  if (hipPivot) {
    hipPivot.rotation.x = -amount * HIP_LOWER_ANGLE
  }

  if (tailPivot) {
    tailPivot.rotation.x = amount * TAIL_LIFT_ANGLE
  }

  if (leftShoulder && rightShoulder) {
    const shoulderRotation = amount * LEG_RAISE_ANGLE
    leftShoulder.rotation.x = shoulderRotation
    rightShoulder.rotation.x = shoulderRotation
  }
}

function getPoseAmount(elapsed: number): number {
  if (elapsed < RAISE_DURATION) {
    return smoothstep(elapsed / RAISE_DURATION)
  }

  const holdEnd = RAISE_DURATION + HOLD_DURATION
  if (elapsed < holdEnd) {
    return 1
  }

  const returnElapsed = elapsed - holdEnd
  if (returnElapsed < RETURN_DURATION) {
    return 1 - smoothstep(returnElapsed / RETURN_DURATION)
  }

  return 0
}

function getStretchPhase(elapsed: number): StretchPhase {
  if (elapsed < RAISE_DURATION) {
    return 'raising'
  }

  if (elapsed < RAISE_DURATION + HOLD_DURATION) {
    return 'holding'
  }

  if (elapsed < RAISE_DURATION + HOLD_DURATION + RETURN_DURATION) {
    return 'returning'
  }

  return 'idle'
}

type UseNpcFrontLegRaiseAnimationParams = CatAnimateRefs &
  UseNpcFrontLegRaiseAnimationOptions

export default function useNpcFrontLegRaiseAnimation({
  hipPivot,
  tailPivot,
  leftShoulder,
  rightShoulder,
  legRaiseTrigger = 0,
  onActiveChange,
}: UseNpcFrontLegRaiseAnimationParams) {
  const refs: CatAnimateRefs = {
    hipPivot,
    tailPivot,
    leftShoulder,
    rightShoulder,
  }

  const phaseRef = useRef<StretchPhase>('idle')
  const sequenceStartTimeRef = useRef<number | null>(null)
  const lastLegRaiseTriggerRef = useRef(0)

  useEffect(() => {
    if (legRaiseTrigger === 0 || legRaiseTrigger === lastLegRaiseTriggerRef.current) {
      return
    }

    if (phaseRef.current !== 'idle') {
      return
    }

    lastLegRaiseTriggerRef.current = legRaiseTrigger
    phaseRef.current = 'raising'
    sequenceStartTimeRef.current = null
    onActiveChange?.(true)
  }, [legRaiseTrigger, onActiveChange])

  useFrame(({ clock }) => {
    if (phaseRef.current === 'idle') {
      return
    }

    if (sequenceStartTimeRef.current === null) {
      sequenceStartTimeRef.current = clock.getElapsedTime()
    }

    const elapsed = clock.getElapsedTime() - sequenceStartTimeRef.current
    const phase = getStretchPhase(elapsed)
    phaseRef.current = phase

    if (phase === 'idle') {
      applyRaisePose(refs, 0)
      sequenceStartTimeRef.current = null
      onActiveChange?.(false)
      return
    }

    applyRaisePose(refs, getPoseAmount(elapsed))
  })

  return {
    isStretching: () => phaseRef.current !== 'idle',
  }
}
