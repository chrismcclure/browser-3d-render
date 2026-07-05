type BoxObjectProps = {
  position?: [number, number, number]
  size?: number
  color?: string
}

export default function BoxObject({
  position = [0, 0, 0],
  size = 1,
  color = 'green',
}: BoxObjectProps) {
  return (
    <mesh position={position}>
      <boxGeometry args={[size, size, size]} />
      <meshStandardMaterial color={color} />
    </mesh>
  )
}
