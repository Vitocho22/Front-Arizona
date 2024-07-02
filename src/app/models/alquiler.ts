export class Alquiler {
    constructor(
        public id: number,
        public fechaInicio: Date,
        public fechaFin: Date,
        public origen: string,
        public destino: string,
        public duracion: number,
        public nombre: string,
        public apellido: string,
        public dni: string,
        public telefono: string,
        public precio: number
    ) {}
}