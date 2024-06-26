import IconButton from '@/components/IconButton'
import { MdHotel, MdInsertPhoto, MdChecklistRtl } from 'react-icons/md'
import { FaPlane, FaCar, FaFolder } from 'react-icons/fa'
import { FaUserPlus } from 'react-icons/fa6'

const Icons = ({ tripId }: { tripId: string }) => (
  <>
    <div className="flex flex-row mt-5 gap-5">
      <IconButton
        Icon={MdHotel}
        iconContainerClassName="bg-orange-500 w-16 h-16"
        iconClassName="w-7 h-7"
        url={tripId + '/hospedajes'}
      />
      <IconButton
        Icon={FaPlane}
        iconContainerClassName="bg-blue-600 w-16 h-16"
        iconClassName="w-7 h-7"
        url={tripId + '/vuelos'}
      />
      <IconButton
        Icon={FaCar}
        iconContainerClassName="bg-green-400 w-16 h-16"
        iconClassName="w-7 h-7"
      />
    </div>
    <div className="flex flex-row mb-5 gap-5">
      <IconButton
        Icon={MdInsertPhoto}
        iconContainerClassName="bg-yellow-400 w-16 h-16"
        iconClassName="w-7 h-7"
        url={tripId + '/fotos'}
      />
      <IconButton
        Icon={MdChecklistRtl}
        iconContainerClassName="bg-neutral-400 w-16 h-16"
        iconClassName="w-7 h-7"
      />
      <IconButton
        Icon={FaUserPlus}
        iconContainerClassName="bg-blue-900 w-16 h-16"
        iconClassName="w-7 h-7"
        url={`${tripId}/compartir`}
      />
    </div>
  </>
)

export default Icons
