import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Router, NavigationEnd } from '@angular/router';
import { Subscription } from 'rxjs';
import { MatSidenav } from '@angular/material/sidenav';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-full',
  templateUrl: './full.component.html',
})
export class FullComponent implements OnInit, OnDestroy {
  @ViewChild('leftsidenav') sidenav: MatSidenav;
  private subscriptions = new Subscription();
  isOver: boolean = false;  // Determina si el modo es 'over' basado en el tamaño de pantalla

  constructor(private breakpointObserver: BreakpointObserver, private router: Router) {}

  ngOnInit(): void {
    this.subscriptions.add(
      this.breakpointObserver.observe([Breakpoints.Handset]).subscribe(result => {
        this.isOver = result.matches;  // Establece isOver según el tamaño de pantalla
      })
    );

    this.subscriptions.add(
      this.router.events.pipe(filter(event => event instanceof NavigationEnd)).subscribe((event: NavigationEnd) => {
        // Se pueden añadir acciones específicas al cambiar de ruta si es necesario
      })
    );
  }
  
  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  onSidenavOpenedChange(event: boolean): void {
    console.log('Sidenav opened:', event);
  }

  onSidenavClosedStart(): void {
    console.log('Sidenav is closing');
  }

  toggleCollapsed(): void {
    if (this.sidenav) {
      this.sidenav.toggle();
    }
  }

  navigateTo(route: string): void {
    this.router.navigate([route]);
  }
}
