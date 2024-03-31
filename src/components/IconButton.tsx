import cx from 'classnames'

type IconButtonProps = {
  Icon: React.ComponentType<{ className?: string }>
  iconContainerClassName?: string
  iconClassName?: string
  iconWidth?: string
  iconHeight?: string
  containerWidth?: string
  containerHeight?: string
  onClick?: () => void
}

const IconButton = ({
  Icon,
  iconContainerClassName,
  iconClassName,
  iconWidth,
  iconHeight,
  containerWidth,
  containerHeight,
  onClick
}: IconButtonProps) => (
  <div
    onClick={onClick}
    className={cx(
      'flex justify-center items-center mt-5 me-5 rounded-xl relative hover:cursor-pointer hover:opacity-90',
      iconContainerClassName,
      containerWidth,
      containerHeight
    )}
  >
    <Icon className={cx(iconClassName, iconWidth, iconHeight)} />
  </div>
)

export default IconButton
