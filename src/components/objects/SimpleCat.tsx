import BoxObject from '../primitives/BoxObject'
import ObjectDebugLabel from '../debug/ObjectDebugLabel'
import SimpleCatFace from './SimpleCatFace'
import type { DebugNameProps } from '../../types/debug'
import type { CatAnimateRefs } from '../../types/catRig'

const FUR_COLOR = '#d99040'
const CHEST_COLOR = '#f4c896'
const EAR_COLOR = '#e8a050'

const HIP_PIVOT: [number, number, number] = [0, 0.36, 0.28]
const FRONT_LEG_HEIGHT = 0.22
const LEFT_FRONT_LEG_SHOULDER: [number, number, number] = [-0.15, -0.14, -0.38]
const RIGHT_FRONT_LEG_SHOULDER: [number, number, number] = [0.15, -0.14, -0.38]

type SimpleCatProps = DebugNameProps & {
  position?: [number, number, number]
  rotation?: [number, number, number]
  scale?: number | [number, number, number]
  animateRefs?: CatAnimateRefs
}

export default function SimpleCat({
  debugName,
  position = [0, 0, 0],
  rotation = [0, 0, 0],
  scale = 1,
  animateRefs,
}: SimpleCatProps) {
  const scaleVector: [number, number, number] =
    typeof scale === 'number' ? [scale, scale, scale] : scale

  return (
    <group position={position} rotation={rotation} scale={scaleVector}>
      <BoxObject
        width={0.13}
        height={0.18}
        depth={0.13}
        color={FUR_COLOR}
        position={[-0.13, 0.09, 0.28]}
      />
      <BoxObject
        width={0.13}
        height={0.18}
        depth={0.13}
        color={FUR_COLOR}
        position={[0.13, 0.09, 0.28]}
      />

      <group ref={animateRefs?.hipPivot} position={HIP_PIVOT}>
        <group ref={animateRefs?.leftShoulder} position={LEFT_FRONT_LEG_SHOULDER}>
          <BoxObject
            width={0.14}
            height={FRONT_LEG_HEIGHT}
            depth={0.14}
            color={FUR_COLOR}
            position={[0, -FRONT_LEG_HEIGHT / 2, 0]}
          />
        </group>

        <group ref={animateRefs?.rightShoulder} position={RIGHT_FRONT_LEG_SHOULDER}>
          <BoxObject
            width={0.14}
            height={FRONT_LEG_HEIGHT}
            depth={0.14}
            color={FUR_COLOR}
            position={[0, -FRONT_LEG_HEIGHT / 2, 0]}
          />
        </group>

        <BoxObject
          width={0.44}
          height={0.42}
          depth={0.78}
          color={FUR_COLOR}
          position={[0, 0.02, -0.065]}
        />

        <BoxObject
          width={0.26}
          height={0.26}
          depth={0.12}
          color={CHEST_COLOR}
          position={[0, 0, -0.42]}
        />

        <group position={[0, 0.22, -0.48]}>
          <BoxObject
            width={0.32}
            height={0.28}
            depth={0.3}
            color={FUR_COLOR}
            position={[0, 0, 0]}
          />

          <SimpleCatFace />

          <BoxObject
            width={0.08}
            height={0.17}
            depth={0.07}
            color={EAR_COLOR}
            position={[-0.13, 0.21, -0.01]}
            rotation={[-0.15, 0, -0.35]}
          />
          <BoxObject
            width={0.08}
            height={0.17}
            depth={0.07}
            color={EAR_COLOR}
            position={[0.13, 0.21, -0.01]}
            rotation={[-0.15, 0, 0.35]}
          />
        </group>

        <group ref={animateRefs?.tailPivot} position={[0, -0.02, 0.2]}>
          <BoxObject
            width={0.22}
            height={0.3}
            depth={0.34}
            color={FUR_COLOR}
            position={[0, 0, 0]}
          />
          <BoxObject
            width={0.2}
            height={0.26}
            depth={0.28}
            color={FUR_COLOR}
            position={[0, 0.16, 0.14]}
            rotation={[0.35, 0, 0]}
          />
          <BoxObject
            width={0.18}
            height={0.22}
            depth={0.24}
            color={FUR_COLOR}
            position={[0.04, 0.3, 0.28]}
            rotation={[0.55, 0.12, 0]}
          />
        </group>
      </group>

      <ObjectDebugLabel name={debugName} offset={[0, 0.45, 0]} />
    </group>
  )
}
