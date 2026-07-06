import BoxObject from '../primitives/BoxObject'

const RUG_HEIGHT = 0.02

type SimpleAreaRugProps = {
  position?: [number, number, number]
  width?: number
  depth?: number
  color?: string
  rotation?: [number, number, number]
}

export default function SimpleAreaRug({
  position = [0, 0, 0],
  width = 10,
  depth = 12,
  color = '#9c8060',
  rotation = [0, 0, 0],
}: SimpleAreaRugProps) {
  return (
    <BoxObject
      width={width}
      height={RUG_HEIGHT}
      depth={depth}
      color={color}
      position={[position[0], RUG_HEIGHT / 2, position[2]]}
      rotation={rotation}
    />
  )
}
