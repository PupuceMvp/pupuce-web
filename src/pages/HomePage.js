import { Transition } from '@headlessui/react'

const HomePage = () => {
    return (
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
            <div
                className={
                    'mx-auto mt-48 max-w-4xl  px-4 text-center text-white'
                }
            >
                <h1 className={'text-zinc-900 text-6xl font-bold'}>
                    Pupuce
                </h1>

                <p className={'text-zinc-900 text-xl'}>
                    Pour la protection de vos animaux de compagnie,
                    l'astuce c'est Pupuce™.
                </p>

            </div>
        </Transition>
    )
}
export default HomePage
