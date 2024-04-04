"use client"
import { useState } from "react"
import { FaFileUpload } from "react-icons/fa";
import { MdDeleteForever } from "react-icons/md";
import IconButton from './IconButton';

const BlobForm = ({ action }: any) => {
    const [file, setFile] = useState<File | null>(null);
    const [isOpen, setIsOpen] = useState(false)

    const uploadFile = async () => {
        await action(file)
        setIsOpen(false)
    }

    return(
        <>
            {isOpen
            ? <div className="fixed z-10 inset-0 overflow-y-auto top-48" aria-labelledby="modal-title" role="dialog" aria-modal="true">
                <div className="flex items-end justify-center pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" aria-hidden="true"></div>
    
                <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all w-full sm:my-8 sm:align-middle sm:max-w-lg">
                    <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                        <form>
                            {file
                            ? <>
                                <div className="flex flex-row items-center p-2 overflow-hidden text-black">
                                    <div className="w-4/5 pe-2">{file.name}</div>
                                    <div className="w-1/5 flex items-center justify-center">
                                        <MdDeleteForever className="w-3/5 h-3/5 text-red-600 hover:text-red-700 hover:cursor-pointer max-w-8 max-h-8" onClick={() => setFile(null)} />
                                    </div>
                                </div>
                                <div className="ps-5 pe-5">
                                    <button className="mt-3 w-full rounded-md border border-transparent shadow-sm px-2 py-2 bg-green-600 text-base font-medium text-white hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500" onClick={uploadFile}>
                                        Subir
                                    </button>
                                </div>
                            </>
                            : <>
                                <input type="file" id="file" name="file" required style={{ display: 'none' }} onChange={e => setFile(e.target.files ? e.target.files[0] : null)} />
                                <label htmlFor="file">
                                    <IconButton Icon={FaFileUpload} iconContainerClassName='bg-cyan-900 border border-green-300 text-green-300 ms-5' 
                                    containerWidth="w-100" containerHeight='h-10' />
                                </label>
                            </>
                            }
                        </form>
                    </div>
                    <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                        <button type="button" className="mt-3 w-full rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm" onClick={() => setIsOpen(false)}>
                            Cerrar
                        </button>
                    </div>
                </div>
                </div>
            </div>
            : <IconButton Icon={FaFileUpload} iconContainerClassName='bg-cyan-900 border border-green-300 text-green-300' 
            containerWidth="w-100" containerHeight='h-10' onClick={() => setIsOpen(true)} />
            }
            {/* <input type="file" id="file" name="file" required style={{ display: 'none' }} onChange={handleFileChange} />
            {!file
            ? <label htmlFor="file">
                <IconButton Icon={FaFileUpload} iconContainerClassName='bg-cyan-900 border border-green-300 text-green-300' 
                containerWidth="w-100" containerHeight='h-10' />
            </label>
            : <button type="submit" className="flex items-center bg-cyan-900 border border-green-300 text-green-300 w-100 h-10 rounded-xl p-2 overflow-hidden">
                <FaUpload />
                {file.name}
            </button> */}
        </>
    )
}

export default BlobForm