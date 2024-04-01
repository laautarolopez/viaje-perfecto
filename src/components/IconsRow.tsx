import IconButton from '@/components/IconButton'
import { MdHotel, MdInsertPhoto, MdChecklistRtl } from 'react-icons/md'
import { FaPlane, FaCar, FaFolder } from 'react-icons/fa'
import cx from 'classnames'

const IconsRow = ({ activeIcon }: { activeIcon: string }) => (
  <>
    <div className='flex flex-row mt-5'>
      <IconButton Icon={MdHotel}
        iconContainerClassName="bg-orange-500"
        containerWidth="w-10" containerHeight="h-10"
        iconWidth="w-5" iconHeight="h-5" />
      <IconButton Icon={FaPlane}
        iconContainerClassName="bg-blue-600"
        containerWidth="w-10" containerHeight="h-10"
        iconWidth="w-5" iconHeight="h-5" />
      <IconButton Icon={FaCar}
        iconContainerClassName="bg-green-400"
        containerWidth="w-10" containerHeight="h-10"
        iconWidth="w-5" iconHeight="h-5" />
      <IconButton Icon={MdInsertPhoto}
        iconContainerClassName="bg-yellow-400"
        containerWidth="w-10" containerHeight="h-10"
        iconWidth="w-5" iconHeight="h-5" />
      <IconButton Icon={MdChecklistRtl}
        iconContainerClassName="bg-neutral-400"
        containerWidth="w-10" containerHeight="h-10"
        iconWidth="w-5" iconHeight="h-5" />
      <IconButton Icon={FaFolder}
        iconContainerClassName="bg-violet-600"
        containerWidth="w-10 me-0" containerHeight="h-10"
        iconWidth="w-5" iconHeight="h-5" />
    </div>
    <div className="flex flex-row mt-2">
      <div className={cx("relative me-5 rounded-xl bg-orange-500 w-10 h-2", activeIcon !== 'hospedaje' ? 'bg-transparent' : '')}></div>
      <div className={cx("relative me-5 rounded-xl bg-blue-600 w-10 h-2", activeIcon !== 'vuelos' ? 'bg-transparent' : '')}></div>
      <div className={cx("relative me-5 rounded-xl bg-green-400 w-10 h-2", activeIcon !== 'auto' ? 'bg-transparent' : '')}></div>
      <div className={cx("relative me-5 rounded-xl bg-yellow-400 w-10 h-2", activeIcon !== 'fotos' ? 'bg-transparent' : '')}></div>
      <div className={cx("relative me-5 rounded-xl bg-neutral-400 w-10 h-2", activeIcon !== 'checklist' ? 'bg-transparent' : '')}></div>
      <div className={cx("relative me-5 rounded-xl bg-violet-600 w-10 h-2", activeIcon !== 'archivos' ? 'bg-transparent' : '')}></div>
    </div>
  </>
)

export default IconsRow