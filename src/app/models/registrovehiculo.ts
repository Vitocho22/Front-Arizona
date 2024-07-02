export class RegistroVehiculo {

    idRegistro: number;
    placa: string;
    fechaRegistro: string;
    horaRegistro: string;
    precio: number;
    cargaUtil: number;
    nombreUsuario: string;
    tipoVehiculo: string;
  
    constructor(
      idRegistro: number,
      placa: string,
      fechaRegistro: string,
      horaRegistro: string,
      precio: number,
      cargaUtil: number,
      nombreUsuario: string,
      tipoVehiculo: string
    ) {
      this.idRegistro = idRegistro;
      this.placa = placa;
      this.fechaRegistro = fechaRegistro;
      this.horaRegistro = horaRegistro;
      this.precio = precio;
      this.cargaUtil = cargaUtil;
      this.nombreUsuario = nombreUsuario;
      this.tipoVehiculo = tipoVehiculo;
    }
  }
  