const ROOM = {
  width: 16,
  depth: 16,
  height: 8,
  wallThickness: 0.1,
}

const ARMCHAIR_COLOR = '#627fa8'

const halfWidth = ROOM.width / 2
const halfDepth = ROOM.depth / 2
const frontZ = halfDepth - ROOM.wallThickness / 2
const backZ = -halfDepth + ROOM.wallThickness / 2
const leftX = -halfWidth + ROOM.wallThickness / 2
const rightX = halfWidth - ROOM.wallThickness / 2

const tvStandHeight = 2.2
const tvStandDepth = 1.5
const tvRotation: [number, number, number] = [0, -Math.PI / 2, 0]
const tvStandX = leftX + tvStandDepth / 2
const tvStandZ = 0

const leftChairX = -2.75
const leftChairZ = frontZ - 1.5
const sideTableZ = leftChairZ
const leftChairInsideArmLocalX = -2.5 / 2 + 0.55 / 2
const leftChairInsideArmLocalZ = 0.12
const leftChairArmTopY = 0.38 + 0.22 + (2.8 - 0.38) * 0.45
const leftChairCatX = leftChairX - leftChairInsideArmLocalX
const leftChairCatZ = leftChairZ - leftChairInsideArmLocalZ
const leftChairCatYaw = Math.atan2(-leftChairCatX, leftChairCatZ)

const portraitWidth = 8 * 0.8 * 0.85
const portraitHeight = portraitWidth * (1024 / 1536)
const portraitFrameThickness = 0.1
const portraitFrameDepth = 0.05
const wallInnerZ = backZ + ROOM.wallThickness / 2
const mainSofaBackTopY = 3
const portraitCenterY = (mainSofaBackTopY + ROOM.height) / 2
const portraitCenterZ = wallInnerZ + portraitFrameDepth / 2 + 0.005

export const livingRoomLayout = {
  rug: {
    position: [0, 0, -0.25] as [number, number, number],
    width: 10.5,
    depth: 12,
  },
  mainSofa: {
    position: [0, 0, backZ + 1.85] as [number, number, number],
    width: 8,
    depth: 3.5,
    height: 3,
  },
  sideSofa: {
    position: [rightX - 2.05, 0, -0.2] as [number, number, number],
    width: 6,
    depth: 3.5,
    height: 3,
    rotation: [0, -Math.PI / 2, 0] as [number, number, number],
  },
  armchairs: [
    {
      position: [-2.75, 0, frontZ - 1.5] as [number, number, number],
      color: ARMCHAIR_COLOR,
      rotation: [0, Math.PI, 0] as [number, number, number],
    },
    {
      position: [2.75, 0, frontZ - 1.5] as [number, number, number],
      color: ARMCHAIR_COLOR,
      rotation: [0, Math.PI, 0] as [number, number, number],
    },
  ],
  sideTable: {
    position: [0, 0, sideTableZ] as [number, number, number],
    tabletopRadius: 0.65,
    height: 1.55,
    tabletopColor: '#ebe4d8',
    frameColor: '#4a3528',
  },
  coffeeTable: {
    position: [0, 0, 0] as [number, number, number],
  },
  tvStand: {
    position: [tvStandX, 0, tvStandZ] as [number, number, number],
    width: 5,
    depth: tvStandDepth,
    height: tvStandHeight,
    rotation: tvRotation,
  },
  tv: {
    position: [tvStandX, tvStandHeight + 1.35, tvStandZ] as [number, number, number],
    width: 4.5,
    height: 2.5,
    wallMount: true,
    rotation: tvRotation,
    screenMode: 'off' as const,
  },
  leftChairCat: {
    position: [leftChairCatX, leftChairArmTopY, leftChairCatZ] as [number, number, number],
    rotation: [0, leftChairCatYaw, 0] as [number, number, number],
    scale: 0.95 * 1.5,
  },
  knightPortrait: {
    position: [0, portraitCenterY, portraitCenterZ] as [number, number, number],
    rotation: [0, 0, 0] as [number, number, number],
    width: portraitWidth,
    height: portraitHeight,
    frameThickness: portraitFrameThickness,
    frameColor: '#4a3528',
    imageSrc: '/assets/cat-knight.png',
  },
}
