import BoxObject from '../primitives/BoxObject'

const FUR_COLOR = '#d99040'
const CHEST_COLOR = '#f4c896'
const EAR_COLOR = '#e8a050'

type SimpleCatProps = {
  position?: [number, number, number]
  rotation?: [number, number, number]
  scale?: number | [number, number, number]
}

export default function SimpleCat({
  position = [0, 0, 0],
  rotation = [0, 0, 0],
  scale = 1,
}: SimpleCatProps) {
  const scaleVector: [number, number, number] =
    typeof scale === 'number' ? [scale, scale, scale] : scale

  return (
    <group position={position} rotation={rotation} scale={scaleVector}>
      <BoxObject
        width={0.14}
        height={0.22}
        depth={0.14}
        color={FUR_COLOR}
        position={[-0.15, 0.11, -0.1]}
      />
      <BoxObject
        width={0.14}
        height={0.22}
        depth={0.14}
        color={FUR_COLOR}
        position={[0.15, 0.11, -0.1]}
      />
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

      <BoxObject
        width={0.44}
        height={0.42}
        depth={0.78}
        color={FUR_COLOR}
        position={[0, 0.38, 0.215]}
      />

      <BoxObject
        width={0.26}
        height={0.26}
        depth={0.12}
        color={CHEST_COLOR}
        position={[0, 0.36, -0.14]}
      />

      <BoxObject
        width={0.32}
        height={0.28}
        depth={0.3}
        color={FUR_COLOR}
        position={[0, 0.58, -0.2]}
      />

      <BoxObject
        width={0.1}
        height={0.14}
        depth={0.08}
        color={EAR_COLOR}
        position={[-0.11, 0.76, -0.2]}
      />
      <BoxObject
        width={0.1}
        height={0.14}
        depth={0.08}
        color={EAR_COLOR}
        position={[0.11, 0.76, -0.2]}
      />

      <BoxObject
        width={0.22}
        height={0.3}
        depth={0.34}
        color={FUR_COLOR}
        position={[0, 0.34, 0.48]}
      />
      <BoxObject
        width={0.2}
        height={0.26}
        depth={0.28}
        color={FUR_COLOR}
        position={[0, 0.5, 0.62]}
        rotation={[0.35, 0, 0]}
      />
      <BoxObject
        width={0.18}
        height={0.22}
        depth={0.24}
        color={FUR_COLOR}
        position={[0.04, 0.64, 0.76]}
        rotation={[0.55, 0.12, 0]}
      />
    </group>
  )
}
