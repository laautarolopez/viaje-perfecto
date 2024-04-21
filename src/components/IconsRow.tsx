import IconButton from '@/components/IconButton'
import { MdHotel, MdInsertPhoto, MdChecklistRtl } from 'react-icons/md'
import { FaPlane, FaCar, FaFolder } from 'react-icons/fa'
import cx from 'classnames'

const IconsRow = ({ activeIcon }: { activeIcon: string }) => (
  <>
    <div className="flex flex-row mt-5 gap-4">
      <IconButton
        Icon={MdHotel}
        iconContainerClassName="w-10 h-10"
        iconClassName="w-5 h-5"
        color="bg-orange-500"
        showUnderline={activeIcon === 'hospedaje'}
      />
      <IconButton
        Icon={FaPlane}
        iconContainerClassName="w-10 h-10"
        iconClassName="w-5 h-5"
        color="bg-blue-600"
        showUnderline={activeIcon === 'vuelos'}
      />
      <IconButton
        Icon={FaCar}
        iconContainerClassName="w-10 h-10"
        iconClassName="w-5 h-5"
        color="bg-green-400"
        showUnderline={activeIcon === 'auto'}
      />
      <IconButton
        Icon={MdInsertPhoto}
        iconContainerClassName="w-10 h-10"
        iconClassName="w-5 h-5"
        color="bg-yellow-400"
        showUnderline={activeIcon === 'fotos'}
      />
      <IconButton
        Icon={MdChecklistRtl}
        iconContainerClassName="w-10 h-10"
        iconClassName="w-5 h-5"
        color="bg-neutral-400"
        showUnderline={activeIcon === 'checklist'}
      />
      <IconButton
        Icon={FaFolder}
        iconContainerClassName="w-10 h-10"
        iconClassName="w-5 h-5"
        color="bg-violet-600"
        showUnderline={activeIcon === 'archivos'}
      />
    </div>
  </>
)

export default IconsRow
