import BoxObject from '../primitives/BoxObject'
import ObjectDebugLabel from '../debug/ObjectDebugLabel'
import type { DebugNameProps } from '../../types/debug'

const TOP_THICKNESS = 0.08

type SimpleTVStandProps = DebugNameProps & {
  position?: [number, number, number]
  width?: number
  depth?: number
  height?: number
  color?: string
  rotation?: [number, number, number]
  centerOpening?: boolean
}

export default function SimpleTVStand({
  debugName,
  position = [0, 0, 0],
  width = 5,
  depth = 1.5,
  height = 2.2,
  color = '#4a4035',
  rotation = [0, 0, 0],
  centerOpening = true,
}: SimpleTVStandProps) {
  const bodyHeight = height - TOP_THICKNESS
  const bodyY = bodyHeight / 2
  const topY = height - TOP_THICKNESS / 2
  const openingWidth = width * 0.35
  const sideWidth = (width - openingWidth) / 2

  return (
    <group position={position} rotation={rotation}>
      {centerOpening ? (
        <>
          <BoxObject
            width={sideWidth}
            height={bodyHeight}
            depth={depth}
            color={color}
            position={[-width / 2 + sideWidth / 2, bodyY, 0]}
          />
          <BoxObject
            width={sideWidth}
            height={bodyHeight}
            depth={depth}
            color={color}
            position={[width / 2 - sideWidth / 2, bodyY, 0]}
          />
          <BoxObject
            width={openingWidth}
            height={0.08}
            depth={depth - 0.2}
            color={color}
            position={[0, bodyHeight * 0.35, 0]}
          />
        </>
      ) : (
        <BoxObject
          width={width}
          height={bodyHeight}
          depth={depth}
          color={color}
          position={[0, bodyY, 0]}
        />
      )}

      <BoxObject
        width={width}
        height={TOP_THICKNESS}
        depth={depth}
        color={color}
        position={[0, topY, 0]}
      />
      <ObjectDebugLabel name={debugName} offset={[0, height + 0.25, 0]} />
    </group>
  )
}
