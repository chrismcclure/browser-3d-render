type WorldDebugHelpersProps = {
  visible: boolean
  gridSize?: number
  gridDivisions?: number
  axesSize?: number
}

const DEFAULT_GRID_SIZE = 32
const DEFAULT_GRID_DIVISIONS = 32
const DEFAULT_AXES_SIZE = 8

export default function WorldDebugHelpers({
  visible,
  gridSize = DEFAULT_GRID_SIZE,
  gridDivisions = DEFAULT_GRID_DIVISIONS,
  axesSize = DEFAULT_AXES_SIZE,
}: WorldDebugHelpersProps) {
  if (!visible) {
    return null
  }

  return (
    <>
      <gridHelper
        args={[gridSize, gridDivisions, '#666666', '#333333']}
        position={[0, 0.02, 0]}
      />
      <axesHelper args={[axesSize]} />
    </>
  )
}
