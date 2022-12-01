import { Transition } from '@headlessui/react'
import {CheckIcon} from "@heroicons/react/24/solid";

const Feedback = ({ message, type }) => {
    return (
        <div className={'absolute flex h-full w-full items-center'}>
            <Transition
                className={
                    'flex flex-col h-full w-full items-center justify-center p-24'
                }
                as="div"
                show={true}
                enter="transition-opacity transition-transform  duration-150"
                enterFrom="opacity-0 translate-y-[10px]"
                enterTo="opacity-100 translate-y-0"
            >
                {type === 'success' &&
                    <span className={'h-14 w-14 bg-green-300 flex items-center justify-center rounded-full'}>
                        <CheckIcon className={'h-8 w-8 text-white'}></CheckIcon>
                    </span>
                }
                <p className={'mt-4 text-center text-zinc-700'}>{message}</p>

            </Transition>
        </div>
    )
}

export default Feedback
