import { format, parseISO } from 'date-fns';
import { FaCalendarCheck, FaCalendarTimes } from "react-icons/fa";

const Dates = ({initial_date, end_date}: {initial_date:string, end_date:string}) => {
    const initial_dateParsed = parseISO(initial_date)
    const initial_formattedDate = format(initial_dateParsed, 'dd/MM/yyyy')
    const end_dateParsed = parseISO(end_date)
    const end_formattedDate = format(end_dateParsed, 'dd/MM/yyyy')

    return (
        <div className="flex flex-row justify-center gap-10 py-5">
            <div className="flex flex-row items-center">
                <FaCalendarCheck className="text-green-300 w-5 h-5 me-2" />
                <div className='font-bold'>{initial_formattedDate}</div>
            </div>
            <div className="flex flex-row items-center">
                <FaCalendarTimes className="text-green-300 w-5 h-5 me-2" />
                <div className='font-bold'>{end_formattedDate}</div>
            </div>
        </div>
    )
}

export default Dates