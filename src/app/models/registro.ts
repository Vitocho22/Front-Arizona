export class RegistroVehiculo {
    placa: string;
    imagenPath: string;
    idUsuario: number;
    constructor(placa: string, imagenPath: string, idUsuario: number
      ) {
          this.placa = placa,
          this.imagenPath = imagenPath,
          this.idUsuario = idUsuario
      }
  }
  