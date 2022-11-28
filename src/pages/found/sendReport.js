import { useEffect, useState } from 'react'
import {useParams} from "react-router-dom";
import axios from 'axios'

import { Transition } from '@headlessui/react'
import Loader from '../../components/Loader'

const SendReport = () => {
    const { uid } = useParams()

    const [singlePetsData, setSinglePetsData] = useState()
    const [isFirstLoading, setIsFirstLoading] = useState(true)

    /*Fetch Api to get list of characters */
    useEffect(() => {
        const fetchData = async () => {
            try {
                /*const getSingleCharacter = await axios.get(
                    `${process.env.REACT_APP_API_PUPUCE}/sendReport/${uid}`
                )
                setSinglePetsData(getSingleCharacter.data)*/
                setIsFirstLoading(false)
            } catch (error) {
                console.log(error.response)
            }
        }
        fetchData()
    }, [uid])

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
            {!isFirstLoading ? (
                <p className={'text-center text-zinc-700'}> uid: {uid}</p>
            ) : (
                <Loader message={'is loading'} />
            )}
        </Transition>

    )
}
export default SendReport
