import React, { Dispatch, SetStateAction } from 'react'
import Input from '@/components/CustomUI/Input'

type Props = {
    eventName: string,
    participants: number,
    setValue?: Dispatch<SetStateAction<any>>
}

const EventGroup = ({ eventName, participants = 2, setValue }: Props) => {

    return (
        <div
            data-augmented-ui="tl-clip tr-2-clip-x br-clip bl-2-clip-x"
            className='styleme relative flex flex-col gap-4 bg-red-700/80 p-6'>
            <span className="">{eventName}</span>

            {Array.from({ length: participants }).map((_, index) => (
                <div key={index} className="flex_center flex-col gap-2">
                    <Input
                        type='text'
                        label={`Participant ${index + 1}`}
                        name='username'
                        placeholder='Enter Name'
                        setValue={setValue} />

                    <Input
                        type='tel'
                        name='username'
                        placeholder='Enter Phone'
                        setValue={setValue} />
                </div>
            ))}
        </div>
    )
}

export default EventGroup