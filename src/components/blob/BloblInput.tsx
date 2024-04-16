import { FaFileUpload } from 'react-icons/fa'
import IconButton from '../IconButton'

type BlobInputProps = {
  disabled: boolean
  onInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}

const BlobInput = ({ onInputChange, disabled }: BlobInputProps) => (
  <>
    <input
      type="file"
      id="file-to-upload"
      name="file-to-upload"
      required
      className="hidden"
      onChange={onInputChange}
      disabled={disabled}
    />
    <label htmlFor="file-to-upload">
      <IconButton
        Icon={FaFileUpload}
        iconContainerClassName="bg-transparent border border-dashed border-green-300 text-green-300 w-100 h-10"
        iconClassName="h-10"
      />
    </label>
  </>
)

export default BlobInput
