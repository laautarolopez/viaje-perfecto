import Image from 'next/image'
import lakeBg from '../../public/images/moreno-lake.jpg'

export default function Home() {
  return (
    <div className="p-5">
      <header className="pb-5">
        <h1 className="text-4xl font-bold mb-5">Viaje Perfecto</h1>
        <div className="bg-green-300 text-green-900 rounded-3xl py-1 px-3 w-fit">
          En 2 dias viajas
        </div>
      </header>
      <main>
        <div className="p-5 relative rounded-xl overflow-hidden">
          <Image
            src={lakeBg}
            layout="fill"
            objectFit="cover"
            alt="Lake Moreno"
            className="absolute inset-0"
          />
          <div className="absolute inset-0 bg-green-900 opacity-70" />
          <h2 className="relative text-3xl font-bold">Sur Argentino</h2>
        </div>
      </main>
      <footer></footer>
    </div>
  )
}
