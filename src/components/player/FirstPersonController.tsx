import { PointerLockControls } from '@react-three/drei'
import { useFrame, useThree } from '@react-three/fiber'
import { useEffect, useLayoutEffect, useRef } from 'react'
import { Vector3 } from 'three'
import type { PointerLockControls as PointerLockControlsImpl } from 'three-stdlib'
import type { PlayerDebugState } from '../debug/DeveloperHud'
import {
  isWalkablePosition,
  livingRoomFurnitureCollisions,
  PLAYER_RADIUS,
} from '../../data/livingRoomCollisions'
import {
  DEFAULT_PLAYER_SPAWN_POSITION,
  DEFAULT_PLAYER_SPAWN_YAW,
  PLAYER_CROUCH_EYE_HEIGHT,
  PLAYER_EYE_HEIGHT,
} from '../../data/playerSpawn'
import { moveWithCollision, type CollisionBox } from '../../utils/collision'

const MOVE_SPEED = 4
const DAMPING = 12
const CROUCH_TRANSITION_RATE = 14
const CROUCH_KEY_CODE = 'KeyZ'

type PlayerStance = 'standing' | 'crouched'

type FirstPersonControllerProps = {
  initialPosition?: [number, number, number]
  initialYaw?: number
  collisionBoxes?: CollisionBox[]
  controlsEnabled?: boolean
  onDebugUpdate?: (state: PlayerDebugState) => void
}

type MovementKeys = {
  forward: boolean
  backward: boolean
  left: boolean
  right: boolean
}

const KEY_BINDINGS: Record<string, keyof MovementKeys> = {
  KeyW: 'forward',
  KeyS: 'backward',
  KeyA: 'left',
  KeyD: 'right',
}

export default function FirstPersonController({
  initialPosition = DEFAULT_PLAYER_SPAWN_POSITION,
  initialYaw = DEFAULT_PLAYER_SPAWN_YAW,
  collisionBoxes = livingRoomFurnitureCollisions,
  controlsEnabled = true,
  onDebugUpdate,
}: FirstPersonControllerProps) {
  const { camera } = useThree()
  const controlsRef = useRef<PointerLockControlsImpl>(null)
  const keys = useRef<MovementKeys>({
    forward: false,
    backward: false,
    left: false,
    right: false,
  })
  const velocity = useRef(new Vector3())
  const forward = useRef(new Vector3())
  const right = useRef(new Vector3())
  const moveDirection = useRef(new Vector3())
  const targetVelocity = useRef(new Vector3())
  const lookDirection = useRef(new Vector3())
  const stanceRef = useRef<PlayerStance>('standing')
  const eyeHeightRef = useRef(PLAYER_EYE_HEIGHT)

  useLayoutEffect(() => {
    camera.position.set(...initialPosition)
    camera.rotation.set(0, initialYaw, 0)
    stanceRef.current = 'standing'
    eyeHeightRef.current = PLAYER_EYE_HEIGHT
  }, [camera, initialPosition, initialYaw])

  useEffect(() => {
    const setKey = (event: KeyboardEvent, pressed: boolean) => {
      if (!controlsEnabled) {
        return
      }

      const action = KEY_BINDINGS[event.code]
      if (action) {
        keys.current[action] = pressed
      }
    }

    const onKeyDown = (event: KeyboardEvent) => {
      if (!controlsEnabled) {
        return
      }

      if (event.code === CROUCH_KEY_CODE) {
        if (event.repeat) {
          return
        }

        stanceRef.current =
          stanceRef.current === 'standing' ? 'crouched' : 'standing'
        return
      }

      setKey(event, true)
    }
    const onKeyUp = (event: KeyboardEvent) => setKey(event, false)

    window.addEventListener('keydown', onKeyDown)
    window.addEventListener('keyup', onKeyUp)

    return () => {
      window.removeEventListener('keydown', onKeyDown)
      window.removeEventListener('keyup', onKeyUp)
    }
  }, [controlsEnabled])

  useEffect(() => {
    if (controlsEnabled) {
      return
    }

    keys.current.forward = false
    keys.current.backward = false
    keys.current.left = false
    keys.current.right = false
    velocity.current.set(0, 0, 0)
    controlsRef.current?.unlock()
  }, [controlsEnabled])

  useFrame((_, delta) => {
    const isLocked = controlsEnabled && (controlsRef.current?.isLocked ?? false)
    const targetEyeHeight =
      stanceRef.current === 'crouched'
        ? PLAYER_CROUCH_EYE_HEIGHT
        : PLAYER_EYE_HEIGHT

    eyeHeightRef.current +=
      (targetEyeHeight - eyeHeightRef.current) *
      (1 - Math.exp(-CROUCH_TRANSITION_RATE * delta))
    camera.position.y = eyeHeightRef.current

    if (isLocked) {
      camera.getWorldDirection(forward.current)
      forward.current.y = 0
      forward.current.normalize()

      right.current.crossVectors(forward.current, camera.up).normalize()

      moveDirection.current.set(0, 0, 0)
      if (keys.current.forward) moveDirection.current.add(forward.current)
      if (keys.current.backward) moveDirection.current.sub(forward.current)
      if (keys.current.left) moveDirection.current.sub(right.current)
      if (keys.current.right) moveDirection.current.add(right.current)

      if (moveDirection.current.lengthSq() > 0) {
        moveDirection.current.normalize()
        targetVelocity.current.copy(moveDirection.current).multiplyScalar(MOVE_SPEED)
      } else {
        targetVelocity.current.set(0, 0, 0)
      }

      velocity.current.lerp(
        targetVelocity.current,
        1 - Math.exp(-DAMPING * delta),
      )

      const deltaX = velocity.current.x * delta
      const deltaZ = velocity.current.z * delta
      const resolved = moveWithCollision(
        camera.position.x,
        camera.position.z,
        deltaX,
        deltaZ,
        PLAYER_RADIUS,
        collisionBoxes,
        (nextX, nextZ) => isWalkablePosition(nextX, nextZ),
      )

      camera.position.x = resolved.x
      camera.position.z = resolved.z
    } else {
      velocity.current.set(0, 0, 0)
    }

    camera.getWorldDirection(lookDirection.current)
    const movementMode: PlayerDebugState['movementMode'] = !isLocked
      ? 'inactive'
      : velocity.current.lengthSq() > 0.01
        ? 'walk'
        : 'idle'

    onDebugUpdate?.({
      position: [camera.position.x, camera.position.y, camera.position.z],
      yawDegrees: (camera.rotation.y * 180) / Math.PI,
      facing: `X ${lookDirection.current.x.toFixed(2)}  Z ${lookDirection.current.z.toFixed(2)}`,
      movementMode,
      collisionEnabled: collisionBoxes.length > 0,
      pointerLocked: isLocked,
    })
  })

  return controlsEnabled ? <PointerLockControls ref={controlsRef} /> : null
}
