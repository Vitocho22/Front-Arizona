import { AfterViewInit, Component, OnInit } from '@angular/core';
import { Map, icon, marker, tileLayer } from 'leaflet';
import { Socket, io } from 'socket.io-client';
import { PlacesService } from 'src/app/services/places.service';

@Component({
  selector: 'app-mapa',
  templateUrl: './mapa.component.html',
  styleUrls: ['./mapa.component.scss']
})
export class MapaComponent implements OnInit, AfterViewInit {

  geo: [number, number] | undefined;
  map: any;
  private socket: Socket;

  constructor(private placeSvc: PlacesService) {
    this.socket = io('http://localhost:3001');
  }

  ngOnInit(): void {
    setTimeout(() => {
      this.geo = this.placeSvc.useLocation;
      if (this.geo) {
        this.socket.emit('locationUpdate', this.geo);
      }
      this.socket.on('locationUpdate', (location: [number, number]) => {
        this.addMarker(location);
      });
    }, 2000);
  }

  ngAfterViewInit() {
    setTimeout(() => {
      if (!this.map && this.geo) { // Verificar si el mapa ya está inicializado
        this.initializeMap();
      }
    }, 2000);
  }

  private initializeMap(): void {
    this.map = new Map('map').setView(this.geo as [number, number],13)
    tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(this.map);
  }

  private addMarker(location: [number, number]): void {
    const myIcon = icon({
      iconUrl: './assets/icono/car2.png',
      iconSize: [40, 60]
    });
    marker(location, { icon: myIcon })
      .addTo(this.map)
      .bindPopup("<b>Ubicación de otro usuario</b>").openPopup();
  }

  ubicar() {
    setTimeout(() => {
      if (this.geo) {
        this.addMarker(this.geo);
      }
    });
  }

  recargar() {
    location.reload();
  }
}

