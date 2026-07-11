import BoxObject from '../primitives/BoxObject'
import ObjectDebugLabel from '../debug/ObjectDebugLabel'
import TvScreenDisplay from './TvScreenDisplay'
import type { DebugNameProps } from '../../types/debug'
import type { TvScreenMode } from '../../types/tvScreen'

const SCREEN_DEPTH = 0.06
const FRAME_THICKNESS = 0.12
const STAND_WIDTH = 0.8
const STAND_DEPTH = 0.4
const STAND_HEIGHT = 0.15

type SimpleTVProps = DebugNameProps & {
  position?: [number, number, number]
  width?: number
  height?: number
  rotation?: [number, number, number]
  wallMount?: boolean
  screenMode?: TvScreenMode
}

export default function SimpleTV({
  debugName,
  position = [0, 0, 0],
  width = 4.5,
  height = 2.5,
  rotation = [0, 0, 0],
  wallMount = false,
  screenMode = 'video-page',
}: SimpleTVProps) {
  const frameColor = '#2a2a2a'

  return (
    <group position={position} rotation={rotation}>
      <BoxObject
        width={width + FRAME_THICKNESS * 2}
        height={height + FRAME_THICKNESS * 2}
        depth={SCREEN_DEPTH}
        color={frameColor}
        position={[0, 0, 0]}
      />

      <TvScreenDisplay width={width} height={height} mode={screenMode} />

      {!wallMount && (
        <BoxObject
          width={STAND_WIDTH}
          height={STAND_HEIGHT}
          depth={STAND_DEPTH}
          color={frameColor}
          position={[0, -height / 2 - STAND_HEIGHT / 2 - FRAME_THICKNESS, 0.1]}
        />
      )}
      <ObjectDebugLabel name={debugName} offset={[0, height / 2 + 0.35, 0]} />
    </group>
  )
}
