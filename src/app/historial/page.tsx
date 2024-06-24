import { getAllMyTrips } from "../actions/trips"
import TripRow from "./components/TripRow"

const HistorialPage = async () => {
    const trips = await getAllMyTrips()
    const old_trips = trips.filter(trip => new Date(trip.end_date) < new Date())
    const future_trips = trips.filter(trip => new Date(trip.end_date) >= new Date())

    return (
        <div className="p-5">
            <h1 className="text-4xl font-bold mb-10">Historial de viajes</h1>
            <div className="mb-10">
                <h1 className="text-xl font-bold mb-5">Viajes hechos</h1>
                {old_trips.length <= 0
                ? <p className="text-green-200 text-center mt-10">No tienes viajes hechos</p>
                : old_trips.map((trip) => (
                        <TripRow key={trip.id} trip={trip} />
                    ))
                }
            </div>
            <div>
                <h1 className="text-xl font-bold mb-5">Futuros viajes</h1>
                {future_trips.length <= 0
                ? <p className="text-green-200 text-center mt-10">No tienes futuros viajes</p>
                : future_trips.map((trip) => (
                        <TripRow key={trip.id} trip={trip} />
                    ))
                }
            </div>
        </div>
    )
}

export default HistorialPage