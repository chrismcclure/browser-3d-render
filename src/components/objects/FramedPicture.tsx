import { Suspense, useLayoutEffect } from 'react'
import { useLoader } from '@react-three/fiber'
import { SRGBColorSpace, TextureLoader } from 'three'
import BoxObject from '../primitives/BoxObject'

const FRAME_DEPTH = 0.05

type FramedPictureProps = {
  position?: [number, number, number]
  rotation?: [number, number, number]
  width?: number
  height?: number
  frameThickness?: number
  frameColor?: string
  imageSrc: string
}

type PictureImageProps = {
  imageSrc: string
  width: number
  height: number
}

function PictureImage({ imageSrc, width, height }: PictureImageProps) {
  const texture = useLoader(TextureLoader, imageSrc)

  useLayoutEffect(() => {
    texture.colorSpace = SRGBColorSpace
    texture.needsUpdate = true
  }, [texture])

  const imageZ = FRAME_DEPTH / 2 + 0.002

  return (
    <mesh position={[0, 0, imageZ]}>
      <planeGeometry args={[width, height]} />
      <meshBasicMaterial map={texture} toneMapped={false} />
    </mesh>
  )
}

export default function FramedPicture({
  position = [0, 0, 0],
  rotation = [0, 0, 0],
  width = 1.6,
  height = 0.9,
  frameThickness = 0.08,
  frameColor = '#4a3528',
  imageSrc,
}: FramedPictureProps) {
  useLoader.preload(TextureLoader, imageSrc)

  const outerWidth = width + frameThickness * 2
  const outerHeight = height + frameThickness * 2
  const halfOuterWidth = outerWidth / 2
  const halfOuterHeight = outerHeight / 2

  return (
    <group position={position} rotation={rotation}>
      <BoxObject
        width={outerWidth}
        height={frameThickness}
        depth={FRAME_DEPTH}
        color={frameColor}
        position={[0, halfOuterHeight - frameThickness / 2, 0]}
      />
      <BoxObject
        width={outerWidth}
        height={frameThickness}
        depth={FRAME_DEPTH}
        color={frameColor}
        position={[0, -halfOuterHeight + frameThickness / 2, 0]}
      />
      <BoxObject
        width={frameThickness}
        height={height}
        depth={FRAME_DEPTH}
        color={frameColor}
        position={[-halfOuterWidth + frameThickness / 2, 0, 0]}
      />
      <BoxObject
        width={frameThickness}
        height={height}
        depth={FRAME_DEPTH}
        color={frameColor}
        position={[halfOuterWidth - frameThickness / 2, 0, 0]}
      />

      <Suspense fallback={null}>
        <PictureImage imageSrc={imageSrc} width={width} height={height} />
      </Suspense>
    </group>
  )
}
