export class Encomienda {
    constructor(
        public id: number,
        public remitente: string,
        public dni_remi: string,
        public destinatario: string,
        public dni_dest: string,
        public descripcion: string,
        public fechaEnvio: Date | null,
        public fechaEntrega: Date | null,
        public estado: string,
        public precio: number,
        public nombreRuta: number
    ) {}
}
