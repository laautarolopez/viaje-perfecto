import Image from 'next/image'
import futureTripBg from '../../../public/images/future-trips-bg.jpeg'

const CardBg = () => (
  <>
    <Image
      src={futureTripBg}
      layout="fill"
      objectFit="cover"
      alt="Future trip"
      className="absolute inset-0"
    />
    <div className="absolute inset-0 bg-green-900 opacity-70" />
  </>
)

export default CardBg
