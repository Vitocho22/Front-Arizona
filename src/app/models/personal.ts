export class Personal {
  id: number;
  nombres: string;
  apellidos: string;
  nroDNI: string;
  edad: number;
  celular: string;
  genero: string;
  fechaNacimiento: Date;
  email: string;
  direccion: string;
  departamento: string;
  provincia: string;
  distrito: string;
  perfil: string;

  constructor(
    id: number,
    nombres: string,
    apellidos: string,
    nroDNI: string,
    edad: number,
    celular: string,
    genero: string,
    fechaNacimiento: Date,
    email: string,
    direccion: string,
    departamento: string,
    provincia: string,
    distrito: string,
    perfil: string
  ) {
    this.id = id;
    this.nombres = nombres;
    this.apellidos = apellidos;
    this.nroDNI = nroDNI;
    this.edad = edad;
    this.celular = celular;
    this.genero = genero;
    this.fechaNacimiento = fechaNacimiento;
    this.email = email;
    this.direccion = direccion;
    this.departamento = departamento;
    this.provincia = provincia;
    this.distrito = distrito;
    this.perfil = perfil;
  }
}
