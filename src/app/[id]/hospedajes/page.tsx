import CardBg from '../../components/CardBg'
import IconsRow from '@/components/IconsRow'
import DaysToTravel from '@/components/DaysToTravel'
import IconButton from '@/components/IconButton'
import { MdHotel } from 'react-icons/md'
import Hospedaje from './components/Hospedaje'
import { fetchHospedajes } from '@/app/lib/services/hospedajes'
import { fetchTripById } from '@/app/lib/services/trips'

const Hospedajes = async ({ params }: { params: { id: string } }) => {
    const tripId = params.id
    const hospedajes = await fetchHospedajes(tripId)
    const { name, initial_date } = await fetchTripById(tripId)

    return (
        <>
            <div className="p-5 relative overflow-hidden">
                <CardBg />
                <div className="flex flex-row mt-3">
                    <h2 className="relative text-4xl font-bold">{name}</h2>
                </div>
                <IconsRow activeIcon="hospedaje" tripId={tripId} />
                <DaysToTravel className="relative mt-5" initialDate={initial_date} />
            </div>
            <div className="p-5 pt-0">
                <div className="flex flex-row items-center gap-5 font-bold text-xl">
                    <IconButton
                        Icon={MdHotel}
                        iconContainerClassName="bg-orange-500 w-10 h-10"
                        iconClassName="w-5 h-5"
                    />
                    <p className="mt-5">Hospedajes</p>
                </div>
                {hospedajes.map((hospedaje) => (
                    <div key={hospedaje.id}>
                        <Hospedaje
                            id={hospedaje.id}
                            name={hospedaje.name}
                            start_date={hospedaje.start_date}
                            end_date={hospedaje.end_date}
                            phone={hospedaje.phone}
                            address={hospedaje.address}
                            price_per_night={hospedaje.price_per_night}
                            paid={hospedaje.paid}
                            trip_id={tripId}
                        />
                        <hr className="relative border-green-300 mt-10" />
                    </div>
                ))}
            </div>
        </>
    )
}

export default Hospedajes