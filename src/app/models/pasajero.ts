export class Pasajero {
    constructor(
        public id: number,
        public pasajero: string,
        public Apellido: string,
        public dni: string,
        public edad: number,
        public asiento: string,
        public fechaEmision: Date,
        public fechaViaje: Date,
        public horaViaje: string,
        public nrocar: number,
        public origen: number,
        public destino: number,
        public precio: number,
        public estado: string
    ) {}
}
