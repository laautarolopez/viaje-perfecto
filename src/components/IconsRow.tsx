import IconButton from '@/components/IconButton'
import { MdHotel, MdInsertPhoto, MdChecklistRtl } from 'react-icons/md'
import { FaPlane, FaCar, FaFolder } from 'react-icons/fa'
import cx from 'classnames'

const IconsRow = ({ activeIcon, tripId }: { activeIcon: string, tripId: string }) => {
  const base_url = '/' + tripId

  return (
    <>
      <div className="flex flex-row mt-5 gap-5">
        <IconButton
            Icon={MdHotel}
            iconContainerClassName="bg-orange-500 w-10 h-10"
            iconClassName="w-5 h-5"
            url={base_url + '/hospedajes'}
        />
        <IconButton
          Icon={FaPlane}
          iconContainerClassName="bg-blue-600 w-10 h-10"
          iconClassName="w-5 h-5"
          url={base_url + '/vuelos'}
        />
        <IconButton
          Icon={FaCar}
          iconContainerClassName="bg-green-400 w-10 h-10"
          iconClassName="w-5 h-5"
        />
        <IconButton
          Icon={MdInsertPhoto}
          iconContainerClassName="bg-yellow-400 w-10 h-10"
          iconClassName="w-5 h-5"
        />
        <IconButton
          Icon={MdChecklistRtl}
          iconContainerClassName="bg-neutral-400 w-10 h-10"
          iconClassName="w-5 h-5"
        />
        <IconButton
          Icon={FaFolder}
          iconContainerClassName="bg-violet-600 w-10 h-10"
          iconClassName="w-5 h-5"
        />
      </div>
      <div className="flex flex-row gap-5 mt-2">
        <div
          className={cx('relative rounded-xl w-10 h-2', {
            'bg-orange-500': activeIcon === 'hospedaje'
          })}
        ></div>
        <div
          className={cx('relative rounded-xl w-10 h-2', {
            'bg-blue-600': activeIcon === 'vuelos'
          })}
        ></div>
        <div
          className={cx('relative rounded-xl w-10 h-2', {
            'bg-green-400': activeIcon === 'auto'
          })}
        ></div>
        <div
          className={cx('relative rounded-xl w-10 h-2', {
            'bg-yellow-400': activeIcon === 'fotos'
          })}
        ></div>
        <div
          className={cx('relative rounded-xl w-10 h-2', {
            'bg-neutral-400': activeIcon === 'checklist'
          })}
        ></div>
        <div
          className={cx('relative rounded-xl w-10 h-2', {
            'bg-violet-600': activeIcon === 'archivos'
          })}
        ></div>
      </div>
    </>
  )
}

export default IconsRow
