export type Usuario = {
    id: string;
    username: string;
    password: string;
};

export type Viaje = {
    id: string;
    nombre: string;
    fecha_inicio: string;
    fecha_fin: string;
    imagen: string;
    usuario: string;
};

export type Hospedaje = {
    id: string;
    nombre: string;
    fecha_inicio: string;
    fecha_fin: string;
    imagen: string;
    direccion: string;
    viaje: string;
};

export type Vuelo = {
    id: string;
    numero: string;
    fecha_partida: string;
    direccion_partida: string;
    fecha_llegada: string;
    direccion_llegada: string;
    viaje: string;
};