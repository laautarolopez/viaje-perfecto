import CardBg from '@/app/components/CardBg'
import IconsRow from './IconsRow'
import DaysToTravel from './DaysToTravel'
import { fetchTripById } from '@/app/lib/services/trips'

const Navbar = async ({
  tripId,
  section
}: {
  tripId: string
  section: string
}) => {
  const { name, initial_date } = await fetchTripById(tripId)
  return (
    <nav className="p-5 relative overflow-hidden">
      <CardBg />
      <div className="flex flex-row mt-3">
        <h2 className="relative text-4xl font-bold">{name}</h2>
      </div>
      <IconsRow activeIcon={section} tripId={tripId} />
      <DaysToTravel className="relative mt-5" initialDate={initial_date} />
    </nav>
  )
}

export default Navbar
