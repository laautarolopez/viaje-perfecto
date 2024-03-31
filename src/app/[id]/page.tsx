const Viaje = ({ params }: { params: { id: string } }) => {
    const id = params.id;

    return(
        <div>Viaje {id}</div>
    )
}

export default Viaje;