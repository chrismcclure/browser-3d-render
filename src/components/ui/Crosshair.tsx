type CrosshairProps = {
  visible?: boolean
}

const DOT_SIZE = 'clamp(3px, 0.35vmin, 5px)'
const LINE_THICKNESS = 'clamp(1px, 0.15vmin, 2px)'
const LINE_LENGTH = 'clamp(6px, 0.75vmin, 10px)'

export default function Crosshair({ visible = true }: CrosshairProps) {
  if (!visible) {
    return null
  }

  return (
    <div
      aria-hidden
      style={{
        position: 'fixed',
        top: '50%',
        left: '50%',
        width: LINE_LENGTH,
        height: LINE_LENGTH,
        transform: 'translate(-50%, -50%)',
        zIndex: 15,
        pointerEvents: 'none',
        background: `
          radial-gradient(circle, rgba(255, 255, 255, 0.95) 0%, rgba(255, 255, 255, 0.95) 100%) center / ${DOT_SIZE} ${DOT_SIZE} no-repeat,
          linear-gradient(rgba(255, 255, 255, 0.92), rgba(255, 255, 255, 0.92)) center / ${LINE_THICKNESS} 100% no-repeat,
          linear-gradient(90deg, rgba(255, 255, 255, 0.92), rgba(255, 255, 255, 0.92)) center / 100% ${LINE_THICKNESS} no-repeat
        `,
        filter: 'drop-shadow(0 0 1px rgba(0, 0, 0, 0.85))',
      }}
    />
  )
}
