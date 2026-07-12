import BoxObject from '../primitives/BoxObject'

const EYE_COLOR = '#111111'
const NOSE_COLOR = '#e8a0b0'
const WHISKER_COLOR = '#efe6d8'

const HEAD_HALF_DEPTH = 0.15
const FACE_Z = -HEAD_HALF_DEPTH - 0.012

const EYE_SIZE = 0.045
const EYE_SPREAD = 0.075
const EYE_Y = 0.025

const NOSE_Y = -0.055
const NOSE_X = 0
const NOSE_Z = FACE_Z - 0.01

const WHISKER_LENGTH = 0.13
const WHISKER_THICKNESS = 0.008
const WHISKER_ORIGIN_X = 0.02

type WhiskerSpec = {
  y: number
  rotation: [number, number, number]
}

const LEFT_WHISKERS: WhiskerSpec[] = [
  { y: NOSE_Y + 0.018, rotation: [0.08, -0.55, -0.12] },
  { y: NOSE_Y, rotation: [0, -0.62, 0] },
  { y: NOSE_Y - 0.018, rotation: [-0.08, -0.55, 0.12] },
]

const RIGHT_WHISKERS: WhiskerSpec[] = [
  { y: NOSE_Y + 0.018, rotation: [0.08, 0.55, 0.12] },
  { y: NOSE_Y, rotation: [0, 0.62, 0] },
  { y: NOSE_Y - 0.018, rotation: [-0.08, 0.55, -0.12] },
]

function Whisker({
  side,
  y,
  rotation,
}: WhiskerSpec & { side: 'left' | 'right' }) {
  const direction = side === 'left' ? -1 : 1

  return (
    <BoxObject
      width={WHISKER_LENGTH}
      height={WHISKER_THICKNESS}
      depth={WHISKER_THICKNESS}
      color={WHISKER_COLOR}
      position={[direction * (WHISKER_ORIGIN_X + WHISKER_LENGTH / 2), y, NOSE_Z]}
      rotation={rotation}
    />
  )
}

export default function SimpleCatFace() {
  return (
    <group>
      <BoxObject
        width={EYE_SIZE}
        height={EYE_SIZE}
        depth={0.02}
        color={EYE_COLOR}
        position={[-EYE_SPREAD, EYE_Y, FACE_Z]}
      />
      <BoxObject
        width={EYE_SIZE}
        height={EYE_SIZE}
        depth={0.02}
        color={EYE_COLOR}
        position={[EYE_SPREAD, EYE_Y, FACE_Z]}
      />

      <BoxObject
        width={0.05}
        height={0.04}
        depth={0.035}
        color={NOSE_COLOR}
        position={[NOSE_X, NOSE_Y, NOSE_Z]}
        rotation={[0.35, 0, 0]}
      />

      {LEFT_WHISKERS.map((whisker, index) => (
        <Whisker key={`left-${index}`} side="left" {...whisker} />
      ))}
      {RIGHT_WHISKERS.map((whisker, index) => (
        <Whisker key={`right-${index}`} side="right" {...whisker} />
      ))}
    </group>
  )
}
