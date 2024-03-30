import IconButton from '@/components/IconButton'
import { MdHotel, MdInsertPhoto, MdChecklistRtl } from 'react-icons/md'
import { FaPlane, FaCar, FaFolder } from 'react-icons/fa'

const Icons = () => (
  <>
    <div className="flex flex-row mt-5">
      <IconButton Icon={MdHotel} iconContainerClassName="bg-orange-500" />
      <IconButton Icon={FaPlane} iconContainerClassName="bg-blue-600" />
      <IconButton Icon={FaCar} iconContainerClassName="bg-green-400" />
    </div>
    <div className="flex flex-row mb-5">
      <IconButton Icon={MdInsertPhoto} iconContainerClassName="bg-yellow-400" />
      <IconButton
        Icon={MdChecklistRtl}
        iconContainerClassName="bg-neutral-400"
      />
      <IconButton Icon={FaFolder} iconContainerClassName="bg-violet-600" />
    </div>
  </>
)

export default Icons
