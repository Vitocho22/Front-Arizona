import { Component, OnInit, ViewEncapsulation, ViewChild } from '@angular/core';
import { MatSelect } from '@angular/material/select';
import {
  ChartComponent as ApexChartComponent,
  ApexAxisChartSeries,
  ApexChart,
  ApexXAxis,
  ApexDataLabels,
  ApexPlotOptions,
  ApexYAxis,
  ApexTitleSubtitle,
  ApexTooltip
} from 'ng-apexcharts';

import { MatPaginator } from '@angular/material/paginator';
import { PasajeroService } from 'src/app/services/pasajero.service';
import { Pasajero } from 'src/app/models/pasajero';
import { MatTableDataSource } from '@angular/material/table';
import { RerutaService } from 'src/app/services/reruta.service';
import { format } from 'date-fns';

export interface pasajero {
  pasajero: string;
  apellido: string;
  precio: number;
  dni: string;
  asiento: string;
  fechaEmision: string;
  fechaViaje: string;
  horaViaje: string;
  nrocar: string;
  origen: string;
  destino: string;
  estado: string;
}

export interface ChartOptions {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  xaxis: ApexXAxis;
  dataLabels: ApexDataLabels;
  plotOptions: ApexPlotOptions;
  yaxis: ApexYAxis;
  title: ApexTitleSubtitle;
  tooltip: ApexTooltip;
}

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class AppDashboardComponent implements OnInit {

  @ViewChild('apexChart') apexChart: ApexChartComponent = Object.create(null);
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild('matSelect') matSelect: MatSelect;

  pasajerosPorMes: number[] = new Array(12).fill(0);
  meses = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];
  mesSeleccionado: number = new Date().getMonth();
  mesActual: string = this.meses[this.mesSeleccionado];
  totalPasajerosMes: number = 0;

  displayedColumns: string[] = ['pasajero', 'apellido', 'precio', 'dni', 'asiento', 'fechaEmision', 'fechaViaje', 'nrocar', 'destino', 'estado'];
  dataSource = new MatTableDataSource<Pasajero, MatPaginator>();
  originalDataSource: Pasajero[] = [];
  precioTotalPorMes: number[] = [];
  filtroBusqueda = {
    dni: '',
    apellido: '',
    nombre: '',
    asiento: ''
  };
  
  paginaActual: number = 1;
  itemsPorPagina: number = 5; 

  resultadoSuma: number;
  totalPasajerosHoy: number;
  totalPasajerosSemana: number;
  origenMasComun: string;
  destinoMasComun: string;

  totalPasajeros: number = 0;
  rutas: any = {}; 
  
  // Mes
  public chartOptions: Partial<ChartOptions> = {
    series: [
      {
        name: 'Pasajeros',
        data: this.pasajerosPorMes,
      },
    ],
    chart: {
      height: 350,
      type: 'bar',
    },
    plotOptions: {
      bar: {
        columnWidth: '45%',
        distributed: true,
      },
    },
    dataLabels: {
      enabled: false,
    },
    xaxis: {
      categories: this.meses,
    },
    title: {
      text: 'Pasajeros por Mes',
      align: 'center',
      style: {
        color: '#444',
      },
    },
  };

  // Definir las opciones del gráfico para la suma de precios por mes
public chartPriceSumOptions: Partial<ChartOptions> = {
  series: [
    {
      name: 'Suma de Precios',
      data: this.precioTotalPorMes,
    },
  ],
  chart: {
    height: 350,
    type: 'bar',
  },
  plotOptions: {
    bar: {
      columnWidth: '45%',
      distributed: true,
    },
  },
  dataLabels: {
    enabled: false,
  },
  xaxis: {
    categories: this.meses,
  },
  title: {
    text: 'Suma de Precios por Mes',
    align: 'center',
    style: {
      color: '#444',
    },
  },
};


  constructor(private pasajeroService: PasajeroService, private rerutaService: RerutaService) {} 
  ngOnInit(): void {
    this.pasajeroService.getPasajeros().subscribe((data: Pasajero[]) => {
      this.dataSource.data = data;
      this.originalDataSource = data;
      this.totalPasajeros = data.length;
      this.resultadoSuma = this.calcularResultadoSuma(data);
      this.totalPasajerosHoy = this.contarPasajerosHoy(data);
      this.origenMasComun = this.obtenerOrigenMasComun(data);
      this.destinoMasComun = this.obtenerDestinoMasComun(data);
      this.totalPasajerosSemana = this.contarPasajerosSemana(data);
      this.actualizarTotalPasajerosMes(data);
      this.pasajerosPorMes = this.calcularPasajerosPorMes(data);
      this.updateChart();
      this.dataSource.paginator = this.paginator;

      this.precioTotalPorMes = this.calcularPrecioTotalPorMes(data);
      this.chartPriceSumOptions.series = [
        {
          name: 'Suma de Precios',
          data: this.precioTotalPorMes,
        },
      ];

    });

    this.getRutas();
    this.updateChart();
  }
  getRutas(): void {
    this.rerutaService.getRuta().subscribe({
      next: (rutas: any) => {
        // Convierte el array de rutas a un objeto con el ID como clave y el nombre como valor
        this.rutas = rutas.reduce((acc, ruta) => {
          acc[ruta.id] = ruta.ruta;
          return acc;
        }, {});
      },
      error: (error) => {
        console.error('Error al obtener las rutas:', error);
      }
    });
  }
  getNombreRuta(id: number): string {
    return this.rutas[id] || '';  // Retorna el nombre de la ruta si existe, de lo contrario retorna una cadena vacía
  }

  parseOrigemMasComun(): number {
    return parseInt(this.origenMasComun, 10);
  }
  
  parseDestinoMasComun(): number {
    return parseInt(this.destinoMasComun, 10);
  }
  aplicarFiltro(): void {
    const { dni, apellido, nombre, asiento } = this.filtroBusqueda;

    const filteredData = this.originalDataSource.filter(pasajero => {
      const matchDni = pasajero.dni.toLowerCase().includes(dni.toLowerCase());
      const matchApellido = pasajero.Apellido.toLowerCase().includes(apellido.toLowerCase());
      const matchNombre = pasajero.pasajero.toLowerCase().includes(nombre.toLowerCase());
      const matchAsiento = asiento === '' || pasajero.asiento === asiento;

      return matchDni && matchApellido && matchNombre && matchAsiento;
    });
    this.dataSource.data = filteredData;
  }

  onBuscarChange(): void {
    this.aplicarFiltro();
  }

  formatFecha(fecha: string): string {
    const fechaFormateada = format(new Date(fecha), 'yyyy-MM-dd');
    return fechaFormateada;
  }

  calcularResultadoSuma(data: Pasajero[]): number {
    return data.reduce((sum, registro) => sum + parseFloat(registro.pasajero), 0);
  }

  contarPasajerosHoy(data: Pasajero[]): number {
    const hoy = new Date().toLocaleDateString();
    return data.filter(pasajero => {
      const fechaViaje = new Date(pasajero.fechaViaje).toLocaleDateString();
      return fechaViaje === hoy;
    }).length;
  }

  contarPasajerosSemana(data: Pasajero[]): number {
    const hoy = new Date();
    const primerDiaSemana = new Date(hoy);
    primerDiaSemana.setDate(hoy.getDate() - hoy.getDay());
    const ultimoDiaSemana = new Date(hoy);
    ultimoDiaSemana.setDate(hoy.getDate() - hoy.getDay() + 6);
    return data.filter(pasajero => {
      const fechaViaje = new Date(pasajero.fechaViaje);
      return fechaViaje >= primerDiaSemana && fechaViaje <= ultimoDiaSemana;
    }).length;
  }
  
  actualizarTotalPasajerosMes(data: Pasajero[]): void {
    this.pasajerosPorMes.fill(0);
    data.forEach(pasajero => {
      const fechaViaje = new Date(pasajero.fechaViaje);
      if (fechaViaje.getFullYear() === new Date().getFullYear()) {
        this.pasajerosPorMes[fechaViaje.getMonth()]++;
      }
    });
    this.totalPasajerosMes = this.pasajerosPorMes[this.mesSeleccionado];
    this.mesActual = this.meses[this.mesSeleccionado];
  }

  onMesChange(event: any): void {
    this.mesSeleccionado = event.value;
    this.totalPasajerosMes = this.pasajerosPorMes[this.mesSeleccionado];
    this.mesActual = this.meses[this.mesSeleccionado];
    this.matSelect.close();
  }

  updateChart(): void {
    this.chartOptions.series = [{
      name: "Pasajeros",
      data: this.pasajerosPorMes
    }];
  }

  obtenerOrigenMasComun(data: Pasajero[]): string {
    const origenes: { [key: string]: number } = {};
    data.forEach(pasajero => {
      if (!origenes[pasajero.origen]) {
        origenes[pasajero.origen] = 0;
      }
      origenes[pasajero.origen]++;
    });
    return Object.keys(origenes).reduce((a, b) => origenes[a] > origenes[b] ? a : b);
  }

  obtenerDestinoMasComun(data: Pasajero[]): string {
    const destinos: { [key: string]: number } = {};
    data.forEach(pasajero => {
      if (!destinos[pasajero.destino]) {
        destinos[pasajero.destino] = 0;
      }
      destinos[pasajero.destino]++;
    });
    return Object.keys(destinos).reduce((a, b) => destinos[a] > destinos[b] ? a : b);
  }

  calcularPasajerosPorMes(data: Pasajero[]): number[] {
    const pasajerosPorMes = new Array(12).fill(0);
    data.forEach((pasajero) => {
      const fechaViaje = new Date(pasajero.fechaViaje);
      const mes = fechaViaje.getMonth();
      pasajerosPorMes[mes]++;
    });
    return pasajerosPorMes;
  }

  getMappedMonths(length: number): string[] {
    const months = [
      'Enero',
      'Febrero',
      'Marzo',
      'Abril',
      'Mayo',
      'Junio',
      'Julio',
      'Agosto',
      'Septiembre',
      'Octubre',
      'Noviembre',
      'Diciembre',
    ];
    return months.slice(0, length);
  }

  actualizarDatosPagina(): void {
    this.paginator.firstPage();
  }

  irASiguientePagina(): void {
    this.paginator.nextPage();
  }

  mostrarBotonSiguiente(): boolean {
    const ultimoItem = this.paginaActual * this.itemsPorPagina;
    return ultimoItem < this.dataSource.data.length;
  }

  getDataPorPagina(): Pasajero[] {
    const startIndex = (this.paginaActual - 1) * this.itemsPorPagina;
    return this.dataSource.data.slice(startIndex, startIndex + this.itemsPorPagina);
  }
  calcularPrecioTotalPorMes(data: Pasajero[]): number[] {
    const precioTotalPorMes = new Array(12).fill(0);
    data.forEach((pasajero) => {
      if (pasajero && typeof pasajero.precio === 'number') {
        const fechaViaje = new Date(pasajero.fechaViaje);
        const mes = fechaViaje.getMonth();
        precioTotalPorMes[mes] += pasajero.precio;
      }
    });
    return precioTotalPorMes;
  }
  
  

  
  
}

