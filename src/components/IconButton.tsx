import cx from 'classnames'

type IconButtonProps = {
  Icon: React.ComponentType<{ className?: string }>
  iconContainerClassName?: string
  iconClassName?: string
  onClick?: () => void
  showUnderline?: boolean
  color?: string
}

const IconButton = ({
  Icon,
  iconContainerClassName,
  iconClassName,
  onClick,
  color,
  showUnderline = false
}: IconButtonProps) => (
  <div className="grid gap-2">
    <div
      onClick={onClick}
      className={cx(
        'flex justify-center items-center mt-5 rounded-xl relative hover:cursor-pointer hover:opacity-90',
        iconContainerClassName,
        color
      )}
    >
      <Icon className={cx(iconClassName)} />
    </div>
    {showUnderline && (
      <div className={cx('relative rounded-xl w-10 h-2', color)}></div>
    )}
  </div>
)

export default IconButton
