import Image from 'next/image'
import planeBg from '../../../../../public/images/plane-bg.png'

const FlightBg = () => (
    <>
        <Image
            src={planeBg}
            layout="fill"
            objectFit="cover"
            alt="Plane background"
            className="absolute inset-0"
        />
        <div className="absolute inset-0 bg-green-900 opacity-70" />
    </>
)

export default FlightBg