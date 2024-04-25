import cx from 'classnames'
import Link from 'next/link'

type IconButtonProps = {
  Icon: React.ComponentType<{ className?: string }>
  iconContainerClassName?: string
  iconClassName?: string
  onClick?: () => void
  url?: string
  showUnderline?: boolean
  color?: string
}

const IconButton = ({
  Icon,
  iconContainerClassName,
  iconClassName,
  onClick,
  url,
  color,
  showUnderline = false
}: IconButtonProps) => (
  <div className='grid gap-2'>
    <Link
      onClick={onClick}
      className={cx(
        'flex justify-center items-center mt-5 rounded-xl relative hover:cursor-pointer hover:opacity-90',
        iconContainerClassName,
        color
      )}
      href={url ? url : ''}
    >
      <Icon className={cx(iconClassName)} />
    </Link>
    {showUnderline && (
      <div className={cx('relative rounded-xl w-10 h-2', color)}></div>
    )}
  </div>
)

export default IconButton
