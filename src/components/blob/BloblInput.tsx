import { FaFileUpload } from 'react-icons/fa'
import IconButton from '../IconButton'

type BlobInputProps = {
  disabled: boolean
  onInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  isImageInput?: boolean
}

const BlobInput = ({
  onInputChange,
  disabled,
  isImageInput
}: BlobInputProps) => (
  <>
    <input
      type="file"
      id="file-to-upload"
      name="file-to-upload"
      required
      className="hidden"
      onChange={onInputChange}
      disabled={disabled}
      accept={isImageInput ? 'image/*' : '*/*'}
    />
    <label htmlFor="file-to-upload">
      <div className="flex justify-center items-center mt-5 rounded-xl relative hover:cursor-pointer hover:opacity-90 bg-transparent border border-dashed border-green-300 text-green-300 w-100 h-10">
        <FaFileUpload className="h-10" />
      </div>
    </label>
  </>
)

export default BlobInput
