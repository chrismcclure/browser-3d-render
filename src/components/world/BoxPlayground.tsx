import { playgroundBoxes } from '../../data/playground/boxes'
import BoxObject from '../primitives/BoxObject'

export default function BoxPlayground() {
  return playgroundBoxes.map((box, index) => (
    <BoxObject key={`${box.color}-${box.position?.join('-')}-${index}`} {...box} />
  ))
}
