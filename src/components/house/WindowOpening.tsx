import BoxObject from '../primitives/BoxObject'

const TRIM_DEPTH = 0.14

type WindowOpeningProps = {
  width?: number
  height?: number
  sillHeight?: number
  trimColor?: string
  glassColor?: string
  position?: [number, number, number]
  rotation?: [number, number, number]
}

export default function WindowOpening({
  width = 10,
  height = 4.5,
  sillHeight = 2.5,
  trimColor = '#b8a078',
  glassColor = '#7da3c6',
  position = [0, 0, 0],
  rotation = [0, 0, 0],
}: WindowOpeningProps) {
  const openingTop = sillHeight + height
  const centerY = sillHeight + height / 2

  return (
    <group position={position} rotation={rotation}>
      <BoxObject
        width={width - 0.4}
        height={height - 0.4}
        depth={0.05}
        color={glassColor}
        position={[0, centerY, 0]}
      />
      <BoxObject
        width={width + 0.2}
        height={0.15}
        depth={TRIM_DEPTH}
        color={trimColor}
        position={[0, openingTop + 0.075, 0]}
      />
      <BoxObject
        width={width + 0.2}
        height={0.2}
        depth={TRIM_DEPTH}
        color={trimColor}
        position={[0, sillHeight - 0.1, 0]}
      />
      <BoxObject
        width={0.15}
        height={height}
        depth={TRIM_DEPTH}
        color={trimColor}
        position={[-width / 2 - 0.075, centerY, 0]}
      />
      <BoxObject
        width={0.15}
        height={height}
        depth={TRIM_DEPTH}
        color={trimColor}
        position={[width / 2 + 0.075, centerY, 0]}
      />
    </group>
  )
}
