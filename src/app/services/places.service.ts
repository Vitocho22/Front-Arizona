import { isPlatformBrowser } from '@angular/common';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PlacesService {

  public useLocation?: [number, number];

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
    if (isPlatformBrowser(this.platformId)) {
      this.loadLocationFromLocalStorage();
      this.getUserLocation();
    }
  }

  private getUserLocation(): void {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        ({ coords }) => {
          this.useLocation = [coords.latitude, coords.longitude];
          this.saveLocationToLocalStorage(this.useLocation);
        },
        (error) => {
          console.error("Error obteniendo la ubicación:", error);
        }
      );
    } else {
      console.error("El navegador no soporta la geolocalización");
    }
  }

  private saveLocationToLocalStorage(location: [number, number]): void {
    localStorage.setItem('userLocation', JSON.stringify(location));
  }

  private loadLocationFromLocalStorage(): void {
    const location = localStorage.getItem('userLocation');
    if (location) {
      this.useLocation = JSON.parse(location);
    }
  }

  updateUserLocation(location: [number, number]): void {
    this.useLocation = location;
  }
}
