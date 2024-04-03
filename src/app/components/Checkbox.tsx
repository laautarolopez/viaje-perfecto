"use client"
import { useState } from "react"
import { MdCheckBox, MdCheckBoxOutlineBlank } from "react-icons/md";

const Checkbox = ({ is_checked }: { is_checked: boolean }) => {
    const [checked, setChecked] = useState(is_checked)

    const changeCheck = () => {
        const old_check = checked
        setChecked(!old_check)
    }

    return (
        <>
            {checked
                ? <MdCheckBox className='w-6 h-6 text-green-300 hover:cursor-pointer' onClick={changeCheck} />
                : <MdCheckBoxOutlineBlank className='w-6 h-6 text-green-300 hover:cursor-pointer' onClick={changeCheck} />
            } 
        </> 
    )
}

export default Checkbox