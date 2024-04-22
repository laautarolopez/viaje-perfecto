import cx from 'classnames'
import Link from 'next/link'

type IconButtonProps = {
  Icon: React.ComponentType<{ className?: string }>
  iconContainerClassName?: string
  iconClassName?: string
  onClick?: () => void
  url?: string
}

const IconButton = ({
  Icon,
  iconContainerClassName,
  iconClassName,
  onClick,
  url
}: IconButtonProps) => (
  <Link
    onClick={onClick}
    className={cx(
      'flex justify-center items-center mt-5 rounded-xl relative hover:cursor-pointer hover:opacity-90',
      iconContainerClassName
    )}
    href={url ? url : ''}
  >
    <Icon className={cx(iconClassName)} />
  </Link>
)

export default IconButton
