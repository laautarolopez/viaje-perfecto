import { FaPlaneDeparture, FaPlaneArrival, FaChevronDown } from 'react-icons/fa'
import { MdAirplaneTicket, MdPlace, MdAccessTime } from 'react-icons/md'
import FlightBg from './flightBg'

const Vuelo = () => (
    <>
        <div className="flex flex-row items-center mt-10">
            <MdAirplaneTicket className='text-green-300 w-10 h-10 me-5' />
            <p className="font-bold text-2xl">Vuelo N°: <span className='text-green-300'>32232343</span></p>
        </div>
        <div className='flex flex-col mt-7 relative overflow-hidden rounded-xl'>
            <FlightBg />
            <p className='relative text-center font-bold mt-3'>Detalles del vuelo:</p>
            <div className="flex flex-col relative p-2">
                <div className="flex flex-row items-center">
                    <FaPlaneDeparture className="text-green-300 me-5 w-6 h-6" />
                    <p className="font-bold">Partida</p>
                </div>
                <div className="flex flex-row items-center mt-2">
                    <MdPlace className="text-green-300 me-5 w-6 h-6" />
                    <p>Aeropuerto Ezeiza, Buenos Aires, Argentina</p>
                </div>
                <div className="flex flex-row items-center mt-2">
                    <MdAccessTime className="text-green-300 me-5 w-6 h-6" />
                    <p>16/05/24 - 22:00hs</p>
                </div>
            </div>
            <hr className="relative text-green-300 m-2" />
            <div className="flex flex-col relative ps-2 pe-2 pt-2 pb-3">
                <div className="flex flex-row items-center">
                    <FaPlaneArrival className="text-green-300 me-5 w-6 h-6" />
                    <p className="font-bold">Llegada</p>
                </div>
                <div className="flex flex-row items-center mt-2">
                    <MdPlace className="text-green-300 me-5 w-6 h-6" />
                    <p>Aeropuerto Florianopolis, Santa Catarina, Brasil</p>
                </div>
                <div className="flex flex-row items-center mt-2">
                    <MdAccessTime className="text-green-300 me-5 w-6 h-6" />
                    <p>17/05/24 - 6:00hs</p>
                </div>
            </div>
        </div>
        <div className="flex flex-row items-center mt-10 justify-between">
            <p className="font-bold text-xl">Archivos adjuntos</p>
            <FaChevronDown className="text-green-300 me-5 w-6 h-6" />
        </div>
    </>
)

export default Vuelo