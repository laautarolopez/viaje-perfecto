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
      'flex justify-center items-center mt-5 rounded-xl relative hover:cursor-pointer hover:opacity-90',
      iconContainerClassName
    )}
  >
    <Icon className={cx(iconClassName)} />
  </div>
)

export default IconButton
