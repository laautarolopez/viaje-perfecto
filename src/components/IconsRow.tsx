import IconButton from '@/components/IconButton'
import { MdHotel, MdInsertPhoto, MdChecklistRtl } from 'react-icons/md'
import { FaPlane, FaCar, FaFolder } from 'react-icons/fa'

const IconsRow = () => (
  <div className='flex flex-row mt-5'>
    <IconButton Icon={MdHotel}
      iconContainerClassName="bg-orange-500"
      containerWidth="w-11" containerHeight="h-11"
      iconWidth="w-6" iconHeight="h-6" />
    <IconButton Icon={FaPlane}
      iconContainerClassName="bg-blue-600"
      containerWidth="w-11" containerHeight="h-11"
      iconWidth="w-6" iconHeight="h-6" />
    <IconButton Icon={FaCar}
      iconContainerClassName="bg-green-400"
      containerWidth="w-11" containerHeight="h-11"
      iconWidth="w-6" iconHeight="h-6" />
    <IconButton Icon={MdInsertPhoto}
      iconContainerClassName="bg-yellow-400"
      containerWidth="w-11" containerHeight="h-11"
      iconWidth="w-6" iconHeight="h-6" />
    <IconButton Icon={MdChecklistRtl}
      iconContainerClassName="bg-neutral-400"
      containerWidth="w-11" containerHeight="h-11"
      iconWidth="w-6" iconHeight="h-6" />
    <IconButton Icon={FaFolder}
      iconContainerClassName="bg-violet-600"
      containerWidth="w-11 me-0" containerHeight="h-11"
      iconWidth="w-6" iconHeight="h-6" />
  </div>
)

export default IconsRow