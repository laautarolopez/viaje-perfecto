import IconButton from '@/components/IconButton'
import { MdHotel, MdInsertPhoto, MdChecklistRtl } from 'react-icons/md'
import { FaPlane, FaCar, FaUserPlus } from 'react-icons/fa'

const IconsRow = ({
  activeIcon,
  tripId
}: {
  activeIcon: string
  tripId: string
}) => {
  const base_url = '/' + tripId

  return (
    <div className="flex flex-row mt-5 flex-wrap gap-x-4">
      <IconButton
        Icon={MdHotel}
        iconContainerClassName="w-10 h-10"
        iconClassName="w-5 h-5"
        url={base_url + '/hospedajes'}
        color="bg-orange-500"
        showUnderline={activeIcon === 'hospedaje'}
      />
      <IconButton
        Icon={FaPlane}
        iconContainerClassName="w-10 h-10"
        iconClassName="w-5 h-5"
        url={base_url + '/vuelos'}
        color="bg-blue-600"
        showUnderline={activeIcon === 'vuelos'}
      />
      <IconButton
        Icon={FaCar}
        iconContainerClassName="w-10 h-10"
        iconClassName="w-5 h-5"
        url={base_url + '/auto'}
        color="bg-green-400"
        showUnderline={activeIcon === 'auto'}
      />
      <IconButton
        Icon={MdInsertPhoto}
        iconContainerClassName="w-10 h-10"
        iconClassName="w-5 h-5"
        url={base_url + '/fotos'}
        color="bg-yellow-400"
        showUnderline={activeIcon === 'fotos'}
      />
      <IconButton
        Icon={MdChecklistRtl}
        iconContainerClassName="w-10 h-10"
        iconClassName="w-5 h-5"
        url={base_url + '/checklist'}
        color="bg-neutral-400"
        showUnderline={activeIcon === 'checklist'}
      />
      <IconButton
        Icon={FaUserPlus}
        iconContainerClassName="bg-blue-900 w-10 h-10"
        iconClassName="w-5 h-5"
        color="bg-blue-900"
        url={base_url + '/compartir'}
        showUnderline={activeIcon === 'compartir'}
      />
    </div>
  )
}

export default IconsRow
