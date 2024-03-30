import { MdCheckBox, MdTipsAndUpdates } from "react-icons/md";

const CheckList = () => {
  return (
    <div className="flex flex-col mt-10 gap-5">
        <div className='flex gap-5'>
            <MdTipsAndUpdates className='w-8 h-8 text-green-300' />
            <p className='font-bold'>Te sugerimos llegar al Aeropuerto a las <span className='text-green-300 font-bold'>10:00hs</span></p>
        </div>
        <div className='flex gap-5'>
            <MdCheckBox className='w-6 h-6 text-green-300' />
            <p className='font-bold'>Tengo mi documento</p>
        </div>
        <div className='flex gap-5'>
            <MdCheckBox className='w-6 h-6 text-green-300' />
            <p className='font-bold'>Agarre mi billetera y plata</p>
        </div>
        <div className='flex gap-5'>
            <MdCheckBox className='w-6 h-6 text-green-300' />
            <p className='font-bold'>Agarre mi licencia de conducir</p>
        </div>
        <div className='flex gap-5'>
            <MdCheckBox className='w-6 h-6 text-green-300' />
            <p className='font-bold'>Agarre mi pasaporte</p>
        </div>
    </div>
  )
}

export default CheckList