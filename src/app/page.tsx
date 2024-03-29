import Image from 'next/image'
import lakeBg from '../../public/images/moreno-lake.jpg'
import { MdHotel, MdInsertPhoto, MdChecklistRtl } from "react-icons/md";
import { FaPlane, FaCar, FaFolder } from "react-icons/fa";
import { BiWorld } from "react-icons/bi";
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

export default function Home() {
  return (
    <div className="p-5">
      <header className="pb-5">
        <h1 className="text-4xl font-bold mb-5">Tu próximo viaje</h1>
        <div className="bg-green-300 text-green-900 rounded-3xl py-1 px-3 w-fit">
          En 2 dias viajás
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
          <div className='flex flex-row items-center justify-between'>
            <h2 className="relative text-3xl font-bold">Sur Argentino</h2>
            <BiWorld className='relative w-9 h-9' />
          </div>
          <div className='flex flex-row mt-5'>
            <div className='flex justify-center items-center bg-orange-500 w-16 h-16 mt-5 me-5 rounded-xl relative hover:cursor-pointer hover:opacity-90'>
              <MdHotel className='w-7 h-7' />
            </div>
            <div className='flex justify-center items-center bg-blue-600 w-16 h-16 mt-5 me-5 rounded-xl relative hover:cursor-pointer hover:opacity-90'>
              <FaPlane className='w-7 h-7' />
            </div>
            <div className='flex justify-center items-center bg-green-400 w-16 h-16 mt-5 me-5 rounded-xl relative hover:cursor-pointer hover:opacity-90'>
              <FaCar className='w-7 h-7' />
            </div>
          </div>
          <div className='flex flex-row mb-5'>
            <div className='flex justify-center items-center bg-yellow-400 w-16 h-16 mt-5 me-5 rounded-xl relative hover:cursor-pointer hover:opacity-90'>
              <MdInsertPhoto className='w-7 h-7' />
            </div>
            <div className='flex justify-center items-center bg-neutral-400 w-16 h-16 mt-5 me-5 rounded-xl relative hover:cursor-pointer hover:opacity-90'>
              <MdChecklistRtl className='w-7 h-7' />
            </div>
            <div className='flex justify-center items-center bg-violet-600 w-16 h-16 mt-5 me-5 rounded-xl relative hover:cursor-pointer hover:opacity-90'>
              <FaFolder className='w-7 h-7' />
            </div>
          </div>
        </div>

        <Calendar
          className='text-black'
          defaultValue={[new Date(2024, 2, 22), new Date(2024, 2, 26)]}
        />
      </main>
      <footer></footer>
    </div>
  )
}
