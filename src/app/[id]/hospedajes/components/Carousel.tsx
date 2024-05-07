"use client";

import { Hospedaje as HospedajesType } from "@/app/lib/types"
import Hospedaje from "./Hospedaje"
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Pagination } from 'swiper/modules'
import "swiper/css"
import "swiper/css/navigation"
import "swiper/css/pagination"
import './Carousel.css'

const Carousel = ( { hospedajes, tripId }: { hospedajes: HospedajesType[], tripId: string } ) => {
    return (
        <Swiper
            modules={[Navigation, Pagination]}
            navigation={true}
            pagination={{clickable: true}}
        >
            {hospedajes.map((hospedaje) => (
                <SwiperSlide key={hospedaje.id}>
                    <Hospedaje
                        id={hospedaje.id}
                        name={hospedaje.name}
                        start_date={hospedaje.start_date}
                        end_date={hospedaje.end_date}
                        phone={hospedaje.phone}
                        address={hospedaje.address}
                        price_per_night={hospedaje.price_per_night}
                        paid={hospedaje.paid}
                        trip_id={tripId}
                    />
                </SwiperSlide>
            ))}
        </Swiper>
    )
}

export default Carousel