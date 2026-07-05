export type BoxObjectProps = {
  width?: number
  height?: number
  depth?: number
  color?: string
  position?: [number, number, number]
  rotation?: [number, number, number]
}

export default function BoxObject({
  width = 1,
  height = 1,
  depth = 1,
  color = 'green',
  position = [0, 0, 0],
  rotation = [0, 0, 0],
}: BoxObjectProps) {
  return (
    <mesh position={position} rotation={rotation}>
      <boxGeometry args={[width, height, depth]} />
      <meshStandardMaterial color={color} />
    </mesh>
  )
}
