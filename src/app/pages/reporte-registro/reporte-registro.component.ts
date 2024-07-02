import { Component, ViewChild } from '@angular/core';
import {
  ApexChart,
  ChartComponent,
  ApexDataLabels,
  ApexLegend,
  ApexStroke,
  ApexTooltip,
  ApexAxisChartSeries,
  ApexXAxis,
  ApexYAxis,
  ApexGrid,
  ApexPlotOptions,
  ApexFill,
  ApexMarkers,
  ApexResponsive,
} from 'ng-apexcharts';

import { RegistrovehiculoService } from 'src/app/services/registrovehiculo.service';


export interface salesOverviewChart {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  dataLabels: ApexDataLabels;
  plotOptions: ApexPlotOptions;
  yaxis: ApexYAxis;
  xaxis: ApexXAxis;
  fill: ApexFill;
  tooltip: ApexTooltip;
  stroke: ApexStroke;
  legend: ApexLegend;
  grid: ApexGrid;
  marker: ApexMarkers;
}

export interface yearlyChart {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  dataLabels: ApexDataLabels;
  plotOptions: ApexPlotOptions;
  tooltip: ApexTooltip;
  stroke: ApexStroke;
  legend: ApexLegend;
  responsive: ApexResponsive;
}

export interface monthlyChart {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  dataLabels: ApexDataLabels;
  plotOptions: ApexPlotOptions;
  tooltip: ApexTooltip;
  stroke: ApexStroke;
  legend: ApexLegend;
  responsive: ApexResponsive;
}

export interface RegistroVehiculos {
  placa: string;
  tipoVehiculo: string;
  precio: string;
  cargaUtil: string;
  fechaRegistro: string;
  horaRegistro: string;
}

@Component({
  selector: 'app-reporte-registro',
  templateUrl: './reporte-registro.component.html',
  styleUrls: ['./reporte-registro.component.scss']
})
export class ReporteRegistroComponent {

  @ViewChild('chart') chart: ChartComponent = Object.create(null);

  public yearlyChart!: Partial<yearlyChart> | any;

  displayedColumns: string[] = ['placa', 'carga', 'tipo', 'precio', 'hora', 'fecha'];
  dataSource: RegistroVehiculos[] = [];

  constructor(private registroService: RegistrovehiculoService) {

    // yearly breakup chart
    this.yearlyChart = {
      series: [38, 40, 25],

      chart: {
        type: 'donut',
        fontFamily: "'Plus Jakarta Sans', sans-serif;",
        foreColor: '#adb0bb',
        toolbar: {
          show: false,
        },
        height: 130,
      },
      colors: ['#5D87FF', '#ECF2FF', '#F9F9FD'],
      plotOptions: {
        pie: {
          startAngle: 0,
          endAngle: 360,
          donut: {
            size: '75%',
            background: 'transparent',
          },
        },
      },
      stroke: {
        show: false,
      },
      dataLabels: {
        enabled: false,
      },
      legend: {
        show: false,
      },
      responsive: [
        {
          breakpoint: 991,
          options: {
            chart: {
              width: 120,
            },
          },
        },
      ],
      tooltip: {
        enabled: false,
      },
    };
  }

  ngOnInit(): void {
    this.cargarDatosRegistros();
  }

  cargarDatosRegistros() {
    // Llamada al servicio para obtener datos
    this.registroService.getRegistrosVehiculos().subscribe(
      (registros: RegistroVehiculos[]) => {
        console.log(registros);
        // Mapear los datos al formato que necesita tu tabla
        this.dataSource = registros.map(registro => ({
          placa: registro.placa,
          tipoVehiculo: registro.tipoVehiculo,
          precio: registro.precio.toString(),
          cargaUtil: registro.cargaUtil.toString(),
          fechaRegistro: this.formatoFecha(registro.fechaRegistro),
          horaRegistro: this.formatoHora(registro.horaRegistro)
        }));
      },
      error => {
        console.error('Error al obtener registros:', error);
      }
    );
  }
  formatoFecha(fecha: string): string {
    const fechaObj = new Date(fecha);
    const fechaFormateada = fechaObj.toLocaleDateString();
    return fechaFormateada;
  }
  formatoHora(hora: string): string {
    const horaObj = new Date(`2000-01-01T${hora}`);
    const horaFormateada = horaObj.toLocaleTimeString('es-PE', { hour: '2-digit', minute: '2-digit' });
    return horaFormateada;
  }
}
