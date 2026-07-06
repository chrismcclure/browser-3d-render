type FloorProps = {
  size?: number
  width?: number
  depth?: number
  color?: string
}

export default function Floor({
  size = 50,
  width,
  depth,
  color = '#808080',
}: FloorProps) {
  const floorWidth = width ?? size
  const floorDepth = depth ?? size

  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]}>
      <planeGeometry args={[floorWidth, floorDepth]} />
      <meshStandardMaterial color={color} />
    </mesh>
  )
}
