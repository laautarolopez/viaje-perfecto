import { BiWorld } from 'react-icons/bi'
import Icons from './Icons'
import CardBg from './CardBg'

const NextTripCard = ({ name, tripId }: { name: string, tripId: string }) => {
  return (
    <div className="p-5 mb-5 relative rounded-xl overflow-hidden">
      <CardBg />
      <div className="flex flex-row items-center justify-between">
        <h2 className="relative text-3xl font-bold">{name}</h2>
        <BiWorld className="relative w-9 h-9" />
      </div>
      <Icons tripId={tripId} />
    </div>
  )
}

export default NextTripCard
