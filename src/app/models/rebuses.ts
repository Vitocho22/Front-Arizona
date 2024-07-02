export class Rebuses {
  id: number;
  marca: string;
  nro_placa: string;
  modelo: string;
  color: string;
  nroserie: string;
  nroCarro: string;

  constructor(id: number, marca: string, nro_placa: string, modelo: string, color: string, nroserie: string, nroCarro: string) {
    this.id = id;
    this.marca = marca;
    this.nro_placa = nro_placa;
    this.modelo = modelo;
    this.color = color;
    this.nroserie = nroserie;
    this.nroCarro = nroCarro;
  }
}
