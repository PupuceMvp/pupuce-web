import {useEffect, useMemo, useRef, useState} from 'react'
import {useParams} from "react-router-dom";
import axios from 'axios'
import TextareaAutosize from 'react-textarea-autosize';

// map
import L from 'leaflet';
import {MapContainer, TileLayer, Marker, Circle, useMap, Tooltip} from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import '../../styles/leafletCustom.css'
import MarkerIcon from "../../assets/marker.svg";

import {Transition} from '@headlessui/react'
import Loader from '../../components/Loader'
import logo from "../../assets/logo.svg";
import Feedback from "../../components/Feedback";
import convertToRelativeDate from "../../util/date";

// util for leaflet
const tileLayer = {
    attribution: '&copy; <a href="https://osm.org/copyright">OpenStreetMap</a> contributors',
    url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
}

/* default coordinate on first load */
const center = [52.22977, 21.01178];

/* Get current location of device on load */
const Location = ({position, setPosition}) => {
    const map = useMap();
    const markerRef = useRef(null)

    /* adjust marker on location demand */
    useEffect(() => {
        map.locate({
            setView: true
        })
        map.on('locationfound', (event) => {
            setPosition(event.latlng)
        })
    }, [map, setPosition])

    /* allow drag the marker to adjust position */
    const eventHandlers = useMemo(() => ({
        dragend() {
            const marker = markerRef.current
            if (marker != null) {
                setPosition(marker.getLatLng())
            }
        },
    }), [setPosition],)

    return position ? (
        <>
            <Circle center={position} weight={2} color={'#FFD496'} fillColor={'#FFD496'} fillOpacity={0.3}
                    radius={500}></Circle>
            <Marker position={position} draggable={true}
                    eventHandlers={eventHandlers} ref={markerRef}>
                <Tooltip direction="bottom" offset={[-15, 30]} opacity={1} permanent>
                        <span className={'text-center'}>
                            <span className={'block font-bold'}>🐶 Votre chien est ici </span>
                             <span className={"block font-normal text-zinc-500 text-xs"}>(déplacer le marker pour ajuster la position)</span>
                        </span>
                </Tooltip>
            </Marker>
        </>
    ) : null
}


const Portal = () => {

    const {uid} = useParams()

    const [singlePetData, setSinglePetData] = useState()
    const [isFirstLoading, setIsFirstLoading] = useState(true)

    const [isReportPosted, setIsReportPosted] = useState(false)

    const [position, setPosition] = useState(null)
    const [message, setMessage] = useState('')

    /* Leaflet - replace default marker options */
    useEffect(() => {
        delete L.Icon.Default.prototype._getIconUrl;
        L.Icon.Default.mergeOptions({
            iconRetinaUrl: MarkerIcon, iconUrl: MarkerIcon, shadowUrl: null, shadowSize: null, shadowAnchor: null,
        });
    }, []);

    /* Fetch Api to get pet information */
    useEffect(() => {
        const fetchData = async () => {
            try {
                const getSinglePet = await axios.get(
                    `${process.env.REACT_APP_API_PUPUCE_URL}/api/pet/${uid}`
                )
                setSinglePetData(getSinglePet.data)
                setIsFirstLoading(false)
            } catch (error) {
                console.log(error.response)
            }
        }
        fetchData()

    }, [uid])

    /* Post report to the owner pet */
    const handleReportSubmit = async (ev) => {
        ev.preventDefault()
        try {
            const sendReport = await axios.post(`${process.env.REACT_APP_API_PUPUCE_URL}/api/reporting`, {
                message: message,
                locationLat: position.lat,
                locationLong: position.lng,
                petUid: uid
            });
            setIsReportPosted(true)
            console.log(sendReport.data)
        } catch (error) {
            console.log(error.response)
        }
    }

    return (
        <Transition
            className={'flex min-h-screen w-full items-center justify-center'}
            as="div"
            show={true}
            enter="transition-opacity transition-transform  duration-150"
            enterFrom="opacity-0 translate-y-[10px]"
            enterTo="opacity-100 translate-y-0"
        >
            {!isFirstLoading ? (
                <>
                    {singlePetData ? (
                            <>
                                {!isReportPosted ? (
                                    <div className={'mx-auto md:max-w-xl px-4 text-white my-24'}>
                                        <div className={"flex w-full flex-col items-center"}>
                                            <img src={logo} alt="Logo" className={"w-44"}/>
                                            <p className={"mt-8 text-3xl font-bold text-zinc-600 text-center"}>On dirait que
                                                vous avez identifié la Pupuce de "{singlePetData.name}"!</p>
                                            {/* Resume of pet*/}
                                            <div className="relative my-8 w-full">
                                                <div className="absolute inset-0 flex items-center" aria-hidden="true">
                                                    <div className="w-full border-t border-zinc-200"/>
                                                </div>
                                                <div className="relative flex justify-center">
                                            <span
                                                className="bg-primary-light px-4 text-md font-medium text-zinc-600 text-center">Voici sa description</span>
                                                </div>
                                            </div>
                                            <div className="flex">
                                                <div className="mr-4 flex-shrink-0 self-center">
                                                    <img
                                                        className="inline-block h-16 w-16 rounded-full object-cover"
                                                        src={singlePetData.image.secure_url}
                                                        alt=""
                                                    />
                                                </div>
                                                <div>
                                                    <h4 className="text-lg font-bold text-zinc-600">{singlePetData.name} </h4>
                                                    <p className={"text-zinc-500 font-normal"}>
                                                        {singlePetData.type ? singlePetData.type : ' -- '} •
                                                        {singlePetData.breed ? singlePetData.breed : ' -- '} •
                                                        {singlePetData.birthday ? convertToRelativeDate(singlePetData.birthday) : ' -- '} •
                                                        {singlePetData.color ? singlePetData.color : ' -- '}
                                                        <a href={"https://www.google.com"}
                                                           className={'underline text-primary-dark'}>Agrandir la photos</a>
                                                    </p>
                                                    <p className="mt-1 text-zinc-600">
                                                        [description de l'animal] Repudiandae sint consequuntur vel. Amet ut nobis explicabo numquam
                                                        expedita quia omnis voluptatem. Minus
                                                        quidem ipsam quia iusto...
                                                    </p>
                                                </div>
                                            </div>

                                            {/* actions panel*/}
                                            <div className="relative mt-12 w-full">
                                                <div className="absolute inset-0 flex items-center" aria-hidden="true">
                                                    <div className="w-full border-t border-zinc-200"/>
                                                </div>
                                                <div className="relative flex justify-center">
                                            <span
                                                className="bg-primary-light px-4 text-md font-medium text-zinc-600 text-center">Alors, c'est bien {singlePetData.name} ?</span>
                                                </div>
                                            </div>

                                            {/*post report*/}
                                            <div className={"mt-8 flex w-full flex-col items-center"}>

                                                <div className="w-full rounded-lg bg-white border">
                                                    <div className="flex flex-col ">
                                                        {/*map*/}
                                                        <div className="w-full p-4 pb-0">
                                                            <div className="h-72 rounded-lg overflow-hidden " id="map">
                                                                <MapContainer
                                                                    center={center}
                                                                    zoom={18}
                                                                    scrollWheelZoom={false}
                                                                >
                                                                    <TileLayer {...tileLayer} />
                                                                    <Location position={position}
                                                                              setPosition={setPosition}/>
                                                                </MapContainer>
                                                                <p></p>
                                                            </div>
                                                        </div>
                                                        {/* message*/}
                                                        <form className={'w-full'} onSubmit={handleReportSubmit}>
                                                            <div className="w-full pt-2 pb-4 px-4 text-zinc-600">
                                                                <p className={'font-bold'}>Message:</p>
                                                                <TextareaAutosize
                                                                    name="message"
                                                                    id="message"
                                                                    className="placeholder-zinc-400 block w-full text-zinc-600 border-0  border-transparent p-0 pb-2 focus:ring-0 text-md"
                                                                    placeholder="Écrivez ici toutes informations qui vous semblent utiles ..."
                                                                    value={message}
                                                                    onChange={(ev) => {
                                                                        setMessage(ev.target.value)
                                                                    }}
                                                                />
                                                            </div>
                                                            <div className={'flex justify-center w-full border-t py-4'}>
                                                                <button
                                                                    disabled={message ==="" & true}
                                                                    type="submit"
                                                                    className={'btn justify-center text-center btn-md btn-primary disabled:opacity-50'}>
                                                                    Prévenir son propriétaire
                                                                </button>
                                                            </div>
                                                        </form>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ) :
                                    <Feedback message={["Votre message a été envoyé." , <br/> , <span className={"font-bold"}>🤗{singlePetData.name} et son propriétaire vous remercient.</span>]} type="success"></Feedback>
                                }
                            </>
                        ) :
                        (
                            <Loader message={"Désolé, nous n'avons pas réussi à identifier cet animal ..."}></Loader>
                        )
                    }
                </>
            ) : (<Loader message={'is loading'}/>)}
        </Transition>
    )
}
export default Portal
