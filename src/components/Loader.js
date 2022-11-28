import { Transition } from '@headlessui/react'

const Loader = ({ message }) => {
    return (
        <div className={'absolute flex h-full w-full items-center'}>
            <Transition
                className={
                    'flex h-full w-full items-center justify-center bg-zinc-700/20 p-24'
                }
                as="div"
                show={true}
                enter="transition-opacity transition-transform  duration-150"
                enterFrom="opacity-0 translate-y-[10px]"
                enterTo="opacity-100 translate-y-0"
            >
                <p className={'text-center text-zinc-700'}>{message}</p>
            </Transition>
        </div>
    )
}

export default Loader
