import { Suspense, useLayoutEffect } from 'react'
import { useLoader } from '@react-three/fiber'
import { SRGBColorSpace, TextureLoader } from 'three'
import type { TvScreenMode } from '../../types/tvScreen'

const THUMBNAIL_SRC = '/assets/mr-feast-thumbnail.png'
const OFF_SCREEN_COLOR = '#111111'

useLoader.preload(TextureLoader, THUMBNAIL_SRC)

type TvScreenDisplayProps = {
  width: number
  height: number
  mode?: TvScreenMode
}

type TvScreenMeshProps = {
  width: number
  height: number
  mode: TvScreenMode
}

function TvScreenMesh({ width, height, mode }: TvScreenMeshProps) {
  const texture = useLoader(TextureLoader, THUMBNAIL_SRC)
  // TV is rotated to face the room; screen sits on local -Z (not +Z).
  const screenZ = -0.035
  const isOff = mode === 'off'

  useLayoutEffect(() => {
    texture.colorSpace = SRGBColorSpace
    texture.needsUpdate = true
  }, [texture])

  return (
    <>
      <mesh position={[0, 0, screenZ]} rotation={[0, Math.PI, 0]} renderOrder={1}>
        <planeGeometry args={[width, height]} />
        <meshBasicMaterial map={texture} toneMapped={false} />
      </mesh>
      {isOff ? (
        <mesh position={[0, 0, screenZ - 0.002]} rotation={[0, Math.PI, 0]} renderOrder={2}>
          <planeGeometry args={[width, height]} />
          <meshBasicMaterial color={OFF_SCREEN_COLOR} toneMapped={false} />
        </mesh>
      ) : null}
    </>
  )
}

export default function TvScreenDisplay({
  width,
  height,
  mode = 'video-page',
}: TvScreenDisplayProps) {
  return (
    <Suspense fallback={null}>
      <TvScreenMesh width={width} height={height} mode={mode} />
    </Suspense>
  )
}
