import { Billboard, Text } from '@react-three/drei'
import { useDebugLabels } from './DebugLabelProvider'

type ObjectDebugLabelProps = {
  name?: string
  offset?: [number, number, number]
}

export default function ObjectDebugLabel({
  name,
  offset = [0, 0.3, 0],
}: ObjectDebugLabelProps) {
  const { visible } = useDebugLabels()

  if (!visible || !name) {
    return null
  }

  return (
    <group raycast={() => null}>
      <Billboard position={offset}>
        <Text
          fontSize={0.18}
          color="#f5f5f5"
          anchorX="center"
          anchorY="bottom"
          outlineWidth={0.015}
          outlineColor="#111111"
        >
          {name}
        </Text>
      </Billboard>
    </group>
  )
}
