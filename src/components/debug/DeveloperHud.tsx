export type PlayerDebugState = {
  position: [number, number, number]
  yawDegrees: number
  facing: string
  movementMode: 'inactive' | 'idle' | 'walk'
  collisionEnabled: boolean
  pointerLocked: boolean
}

type DeveloperHudProps = {
  state: PlayerDebugState | null
}

function formatCoord(value: number) {
  return value.toFixed(2)
}

export default function DeveloperHud({ state }: DeveloperHudProps) {
  return (
    <div
      style={{
        position: 'fixed',
        top: 12,
        left: 12,
        zIndex: 10,
        padding: '10px 12px',
        borderRadius: 6,
        background: 'rgba(0, 0, 0, 0.72)',
        color: '#f3f3f3',
        fontFamily: 'ui-monospace, SFMono-Regular, Menlo, monospace',
        fontSize: 12,
        lineHeight: 1.5,
        pointerEvents: 'none',
        minWidth: 220,
      }}
    >
      <div style={{ fontWeight: 600, marginBottom: 6 }}>Developer HUD</div>
      <div>pos x {state ? formatCoord(state.position[0]) : '—'}</div>
      <div>pos y {state ? formatCoord(state.position[1]) : '—'}</div>
      <div>pos z {state ? formatCoord(state.position[2]) : '—'}</div>
      <div>yaw {state ? `${formatCoord(state.yawDegrees)}°` : '—'}</div>
      <div>facing {state?.facing ?? '—'}</div>
      <div>mode {state?.movementMode ?? '—'}</div>
      <div>collision {state ? (state.collisionEnabled ? 'on' : 'off') : '—'}</div>
      <div>mouse {state ? (state.pointerLocked ? 'locked' : 'unlocked') : '—'}</div>
    </div>
  )
}
