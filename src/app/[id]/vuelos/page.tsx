import CardBg from '../../components/CardBg';
import IconsRow from '@/components/IconsRow';
import DaysToTravel from '@/components/DaysToTravel';
import IconButton from '@/components/IconButton'
import { FaPlane } from 'react-icons/fa'
import Vuelo from './components/Vuelo'
import { fetchFlys } from '@/app/lib/services/flys'
import { fetchNextTrip } from '@/app/lib/services/trips'

const Vuelos = async () => {
    const { nextTripInitialDate, flys } = await fetchFlys()
    const { initialDate } = await fetchNextTrip()

    return (
        <>
            <div className="p-5 relative overflow-hidden">
                <CardBg />
                <div className="flex flex-row mt-3">
                    <h2 className="relative text-4xl font-bold">Sur Argentino</h2>
                </div>
                <IconsRow activeIcon="vuelos" />
                <DaysToTravel className="relative mt-5" initialDate={initialDate} />
            </div>
            <div className="p-5 pt-0">
                <div className="flex flex-row items-center">
                    <IconButton Icon={FaPlane}
                        iconContainerClassName="bg-blue-600"
                        containerWidth="w-10" containerHeight="h-10"
                        iconWidth="w-5" iconHeight="h-5" />
                    <p className="mt-5">Vuelos</p>
                </div>
                <Vuelo />
                <hr className="relative border-green-300 mt-10" />
                <Vuelo />
            </div>
        </>
    )
}

export default Vuelos;