import { FaFileDownload } from "react-icons/fa";

const FileBlob = ({filename, download}: {filename: string, download: string}) => {
    return (
        <div className="flex bg-cyan-900 items-center px-2 border border-green-300 text-green-300 rounded-xl w-100 h-10 mb-5 overflow-hidden truncate">
            <div className="w-5/6 overflow-hidden">{filename}</div>
            <div className="w-1/6 flex items-center justify-center">
                <a href={download}><FaFileDownload className="max-w-5 max-h-5" /></a>
            </div>
        </div>
    )
}

export default FileBlob