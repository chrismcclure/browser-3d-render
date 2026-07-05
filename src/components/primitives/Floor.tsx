type FloorProps = {
  size?: number
  color?: string
}

export default function Floor({ size = 50, color = '#808080' }: FloorProps) {
  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]}>
      <planeGeometry args={[size, size]} />
      <meshStandardMaterial color={color} />
    </mesh>
  )
}
