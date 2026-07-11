import { livingRoomLayout } from '../../layouts/livingRoomLayout'
import SelectableRoot from '../debug/SelectableRoot'
import SimpleAreaRug from '../objects/SimpleAreaRug'
import SimpleArmchair from '../objects/SimpleArmchair'
import SimpleCat from '../objects/SimpleCat'
import SimpleCoffeeTable from '../objects/SimpleCoffeeTable'
import FramedPicture from '../objects/FramedPicture'
import SimpleRoundSideTable from '../objects/SimpleRoundSideTable'
import SimpleSofa from '../objects/SimpleSofa'
import SimpleTV from '../objects/SimpleTV'
import SimpleTVStand from '../objects/SimpleTVStand'

import type { TvScreenMode } from '../../types/tvScreen'

type LivingRoomFurnitureProps = {
  position?: [number, number, number]
  tvScreenMode?: TvScreenMode
}

export default function LivingRoomFurniture({
  position = [0, 0, 0],
  tvScreenMode,
}: LivingRoomFurnitureProps) {
  const { rug, mainSofa, sideSofa, armchairs, sideTable, coffeeTable, tvStand, tv, leftChairCat, knightPortrait } =
    livingRoomLayout

  return (
    <group position={position}>
      <SimpleAreaRug {...rug} />

      <SelectableRoot debugName="Large Sofa">
        <SimpleSofa {...mainSofa} debugName="Large Sofa" />
      </SelectableRoot>

      <SelectableRoot debugName="Knight Portrait">
        <FramedPicture {...knightPortrait} />
      </SelectableRoot>

      <SelectableRoot debugName="Small Sofa">
        <SimpleSofa {...sideSofa} debugName="Small Sofa" />
      </SelectableRoot>

      <SelectableRoot debugName="Chair Left">
        <SimpleArmchair {...armchairs[0]} debugName="Chair Left" />
      </SelectableRoot>

      <SelectableRoot debugName="Chair Right">
        <SimpleArmchair {...armchairs[1]} debugName="Chair Right" />
      </SelectableRoot>

      <SelectableRoot debugName="Side Table">
        <SimpleRoundSideTable {...sideTable} />
      </SelectableRoot>

      <SelectableRoot debugName="Coffee Table">
        <SimpleCoffeeTable {...coffeeTable} debugName="Coffee Table" />
      </SelectableRoot>

      <SelectableRoot debugName="TV Stand">
        <SimpleTVStand {...tvStand} debugName="TV Stand" />
      </SelectableRoot>

      <SelectableRoot debugName="TV" interactable>
        <SimpleTV {...tv} screenMode={tvScreenMode ?? tv.screenMode} debugName="TV" />
      </SelectableRoot>

      <SelectableRoot debugName="Professor Spaghettio" interactable>
        <SimpleCat {...leftChairCat} debugName="Professor Spaghettio" />
      </SelectableRoot>
    </group>
  )
}
