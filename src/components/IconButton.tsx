import cx from 'classnames'

type IconButtonProps = {
  Icon: React.ComponentType<{ className?: string }>
  iconContainerClassName?: string
  iconClassName?: string
  onClick?: () => void
}

const IconButton = ({
  Icon,
  iconContainerClassName,
  iconClassName,
  onClick
}: IconButtonProps) => (
  <div
    onClick={onClick}
    className={cx(
      'flex justify-center items-center w-16 h-16 mt-5 me-5 rounded-xl relative hover:cursor-pointer hover:opacity-90',
      iconContainerClassName
    )}
  >
    <Icon className={cx('w-7 h-7', iconClassName)} />
  </div>
)

export default IconButton
