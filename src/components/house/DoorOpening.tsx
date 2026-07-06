import BoxObject from '../primitives/BoxObject'

const TRIM_DEPTH = 0.14

type DoorOpeningProps = {
  width?: number
  height?: number
  trimColor?: string
  position?: [number, number, number]
  rotation?: [number, number, number]
}

export default function DoorOpening({
  width = 4,
  height = 7,
  trimColor = '#b8a078',
  position = [0, 0, 0],
  rotation = [0, 0, 0],
}: DoorOpeningProps) {
  return (
    <group position={position} rotation={rotation}>
      <BoxObject
        width={TRIM_DEPTH}
        height={0.15}
        depth={width + 0.2}
        color={trimColor}
        position={[-TRIM_DEPTH / 2, height + 0.075, 0]}
      />
      <BoxObject
        width={TRIM_DEPTH}
        height={height}
        depth={0.15}
        color={trimColor}
        position={[-TRIM_DEPTH / 2, height / 2, -width / 2 - 0.075]}
      />
      <BoxObject
        width={TRIM_DEPTH}
        height={height}
        depth={0.15}
        color={trimColor}
        position={[-TRIM_DEPTH / 2, height / 2, width / 2 + 0.075]}
      />
    </group>
  )
}
