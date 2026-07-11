export default function ModalBackdrop() {
  return (
    <div
      aria-hidden
      style={{
        position: 'absolute',
        inset: 0,
        zIndex: 25,
        cursor: 'default',
        pointerEvents: 'auto',
      }}
    />
  )
}
