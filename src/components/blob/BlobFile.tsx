import { MdDeleteForever } from 'react-icons/md'

type BlobFileProps = {
  fileName: string
  onDeleteClick: () => void
}

const BlobFile = ({ fileName, onDeleteClick }: BlobFileProps) => (
  <div className="flex flex-row items-center p-2 overflow-hidden text-lg text-green-900 bg-green-300 font-bold rounded-lg">
    <div className="w-4/5 pe-2 whitespace-nowrap overflow-hidden text-ellipsis">
      {fileName}
    </div>
    <div className="w-1/5 flex items-center justify-center">
      <MdDeleteForever
        className="w-3/5 h-3/5 text-green-900 hover:cursor-pointer max-w-8 max-h-8"
        onClick={onDeleteClick}
      />
    </div>
  </div>
)

export default BlobFile
