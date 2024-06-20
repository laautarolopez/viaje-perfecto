import { getAllMyTrips } from "../actions/trips"

const HistorialPage = async () => {
    const trips = await getAllMyTrips()
    const old_trips = trips.filter(trip => new Date(trip.end_date) < new Date())
    const future_trips = trips.filter(trip => new Date(trip.end_date) >= new Date())

    return (
        <>
        <header className="p-5">
            <h1 className="text-4xl font-bold mb-5">Historial de viajes</h1>
        </header>
        </>
    )
}

export default HistorialPage