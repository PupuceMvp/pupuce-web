import { Transition } from '@headlessui/react'
import logoAlt from '../assets/logo-alt.svg';
import logo from '../assets/logo.svg';

const HomePage = () => {
    return (
        <Transition
            className={
                'flex min-h-screen w-full items-center justify-center p-24'
            }
            as="div"
            show={true}
            enter="transition-opacity transition-transform  duration-150"
            enterFrom="opacity-0 translate-y-[10px]"
            enterTo="opacity-100 translate-y-0"
        >
            <div
                className={
                    'mx-auto max-w-4xl  px-4 text-center text-white'
                }
            >
                <div className={"flex flex-col items-center justify-center"}>
                    <h1 className={'sr-only'}>
                        Pupuce
                    </h1>
                    <img src={logoAlt} alt="Logo" className={'w-28 mb-4'}/>
                    <img src={logo} alt="Logo" className={"w-80"} />
                </div>

                <p className={'text-zinc-600 text-xl mt-8'}>
                    Pour la protection de vos animaux de compagnie,<br/>
                    l'astuce c'est Pupuce™.
                </p>

            </div>
        </Transition>
    )
}
export default HomePage
