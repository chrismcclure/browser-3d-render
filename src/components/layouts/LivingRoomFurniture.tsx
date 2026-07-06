import { livingRoomLayout } from '../../layouts/livingRoomLayout'
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

      <SimpleSofa {...mainSofa} />
      <SimpleSofa {...sideSofa} />

      {armchairs.map((armchair, index) => (
        <SimpleArmchair key={index} {...armchair} />
      ))}

      <SimpleCoffeeTable {...coffeeTable} />

      <SimpleTVStand {...tvStand} />
      <SimpleTV {...tv} />

      <SimpleCat {...leftChairCat} />
    </group>
  )
}
