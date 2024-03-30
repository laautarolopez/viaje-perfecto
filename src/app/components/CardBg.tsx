import Image from 'next/image'
import lakeBg from '../../../public/images/moreno-lake.jpg'

const CardBg = () => (
  <>
    <Image
      src={lakeBg}
      layout="fill"
      objectFit="cover"
      alt="Lake Moreno"
      className="absolute inset-0"
    />
    <div className="absolute inset-0 bg-green-900 opacity-70" />
  </>
)

export default CardBg
