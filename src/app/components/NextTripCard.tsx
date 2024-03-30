import { BiWorld } from 'react-icons/bi'
import Icons from './Icons'
import CardBg from './CardBg'

const NextTripCard = () => {
  return (
    <div className="p-5 mb-5 relative rounded-xl overflow-hidden">
      <CardBg />
      <div className="flex flex-row items-center justify-between">
        <h2 className="relative text-3xl font-bold">Sur Argentino</h2>
        <BiWorld className="relative w-9 h-9" />
      </div>
      <Icons />
    </div>
  )
}

export default NextTripCard