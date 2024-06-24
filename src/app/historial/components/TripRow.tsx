import { Trip } from "@/app/lib/types"
import { format, parseISO } from 'date-fns';
import { FaCalendarCheck, FaCalendarTimes } from "react-icons/fa";
import Link from "next/link";

const TripRow = ({ trip }: { trip: Trip }) => {
    const initial_dateParsed = parseISO(trip.initial_date)
    const initial_formattedDate = format(initial_dateParsed, 'dd/MM/yyyy')
    const end_dateParsed = parseISO(trip.end_date)
    const end_formattedDate = format(end_dateParsed, 'dd/MM/yyyy')

    return (
        <div className="grid grid-cols-12 w-full bg-cyan-900 p-4 rounded-xl mb-5">
            <div className="col-span-8 font-bold text-lg">{trip.name}</div>
            <div className="col-span-4 flex justify-between items-center">
                <Link
                    href={`/${trip.id}/hospedajes`}
                    className="text-center box-border rounded-lg p-4 w-full font-bold border-green-600 bg-green-300 text-green-900"
                >
                    Ver viaje
                </Link>
            </div>
            <div className="col-span-12">
                <div className="flex flex-col justify-center gap-2">
                    <div className="flex flex-row items-center">
                        <FaCalendarCheck className="text-green-300 w-5 h-5 me-2" />
                        <div className='font-bold'>{initial_formattedDate}</div>
                    </div>
                    <div className="flex flex-row items-center">
                        <FaCalendarTimes className="text-green-300 w-5 h-5 me-2" />
                        <div className='font-bold'>{end_formattedDate}</div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default TripRow