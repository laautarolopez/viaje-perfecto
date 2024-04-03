import { MdTipsAndUpdates } from "react-icons/md";
import { parseISO, format, subHours } from 'date-fns';
import { fetchChecklist } from "@/app/lib/services/checklist";
import { Note } from "@/app/lib/types";
import Checkbox from "@/app/components/Checkbox";

const CheckList = async ({ initial_date, tripId }: { initial_date: string, tripId: string }) => {
    const date = parseISO(initial_date);
    const dateMinusTwoHours = subHours(date, 2);
    const formattedHour = format(dateMinusTwoHours, 'HH:mm');
    const checklist = await fetchChecklist(tripId)

    return (
        <div className="flex flex-col mt-10 gap-5">
            <div className='flex gap-5'>
                <MdTipsAndUpdates className='w-8 h-8 text-green-300' />
                <p className='font-bold'>Te sugerimos llegar al Aeropuerto a las <span className='text-green-300 font-bold'>{formattedHour}hs</span></p>
            </div>
            {
                checklist.map((note: Note) => (
                    <div key={note.id} className='flex gap-5'>
                        <Checkbox is_checked={note.is_checked} />
                        <p className='font-bold'>{note.description}</p>
                    </div>
                ))
            }
        </div>
    )
}

export default CheckList