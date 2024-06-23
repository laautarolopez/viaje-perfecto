import IconButton from '@/components/IconButton'
import Navbar from '@/components/Navbar'
import Blob from '@/components/blob/Blob'
import { MdInsertPhoto } from 'react-icons/md'

const FotosPage = async ({ params }: { params: { id: string } }) => {
  const tripId = params.id

  return (
    <>
      <Navbar tripId={tripId} section="fotos" />
      <div className="p-5">
        <div className="flex flex-row items-center gap-5 font-bold text-xl mb-10">
          <IconButton
            Icon={MdInsertPhoto}
            iconContainerClassName="bg-yellow-400 w-10 h-10"
            iconClassName="w-5 h-5"
          />
          <p className="mt-5">Fotos</p>
        </div>
        <Blob isImageBlob={true} folder={`${tripId}/fotos`} />
      </div>
    </>
  )
}

export default FotosPage
