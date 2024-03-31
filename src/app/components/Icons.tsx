import IconButton from '@/components/IconButton'
import { MdHotel, MdInsertPhoto, MdChecklistRtl } from 'react-icons/md'
import { FaPlane, FaCar, FaFolder } from 'react-icons/fa'

const Icons = () => (
  <>
    <div className="flex flex-row mt-5">
      <IconButton Icon={MdHotel} 
        iconContainerClassName="bg-orange-500" 
        containerWidth="w-16" containerHeight="h-16"
        iconWidth="w-7" iconHeight="h-7" />
      <IconButton Icon={FaPlane}
        iconContainerClassName="bg-blue-600"
        containerWidth="w-16" containerHeight="h-16"
        iconWidth="w-7" iconHeight="h-7" />
      <IconButton Icon={FaCar}
        iconContainerClassName="bg-green-400"
        containerWidth="w-16" containerHeight="h-16"
        iconWidth="w-7" iconHeight="h-7" />
    </div>
    <div className="flex flex-row mb-5">
      <IconButton Icon={MdInsertPhoto}
        iconContainerClassName="bg-yellow-400"
        containerWidth="w-16" containerHeight="h-16"
        iconWidth="w-7" iconHeight="h-7" />
      <IconButton Icon={MdChecklistRtl}
        iconContainerClassName="bg-neutral-400"
        containerWidth="w-16" containerHeight="h-16"
        iconWidth="w-7" iconHeight="h-7" />
      <IconButton Icon={FaFolder}
        iconContainerClassName="bg-violet-600"
        containerWidth="w-16" containerHeight="h-16"
        iconWidth="w-7" iconHeight="h-7" />
    </div>
  </>
)

export default Icons
