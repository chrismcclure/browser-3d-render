import { livingRoomLayout } from '../../layouts/livingRoomLayout'
import SelectableRoot from '../debug/SelectableRoot'
import SimpleAreaRug from '../objects/SimpleAreaRug'
import SimpleArmchair from '../objects/SimpleArmchair'
import SimpleCat from '../objects/SimpleCat'
import SimpleCoffeeTable from '../objects/SimpleCoffeeTable'
import SimpleSofa from '../objects/SimpleSofa'
import SimpleTV from '../objects/SimpleTV'
import SimpleTVStand from '../objects/SimpleTVStand'

type LivingRoomFurnitureProps = {
  position?: [number, number, number]
}

export default function LivingRoomFurniture({
  position = [0, 0, 0],
}: LivingRoomFurnitureProps) {
  const { rug, mainSofa, sideSofa, armchairs, coffeeTable, tvStand, tv, leftChairCat } =
    livingRoomLayout

  return (
    <group position={position}>
      <SimpleAreaRug {...rug} />

      <SelectableRoot debugName="Large Sofa">
        <SimpleSofa {...mainSofa} debugName="Large Sofa" />
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

      <SelectableRoot debugName="Coffee Table">
        <SimpleCoffeeTable {...coffeeTable} debugName="Coffee Table" />
      </SelectableRoot>

      <SelectableRoot debugName="TV Stand">
        <SimpleTVStand {...tvStand} debugName="TV Stand" />
      </SelectableRoot>

      <SelectableRoot debugName="TV">
        <SimpleTV {...tv} debugName="TV" />
      </SelectableRoot>

      <SelectableRoot debugName="Professor Spaghettio" interactable>
        <SimpleCat {...leftChairCat} debugName="Professor Spaghettio" />
      </SelectableRoot>
    </group>
  )
}
