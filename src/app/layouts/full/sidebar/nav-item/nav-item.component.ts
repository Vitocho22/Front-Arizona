import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { NavItem } from './nav-item';
import { Router } from '@angular/router';
import { NavService } from 'src/app/services/nav.service';

@Component({
  selector: 'app-nav-item',
  templateUrl: './nav-item.component.html',
  styleUrls: []
})
export class AppNavItemComponent implements OnChanges {
  @Input() item: NavItem;
  @Input() depth: number = 0;

  constructor(public navService: NavService, public router: Router) {}

  ngOnChanges(changes: SimpleChanges) {
    if (changes['item']) {
      // Opcionalmente manejar cambios en las propiedades de input
    }
  }

  onItemSelected(item: NavItem) {
    if (item.children && item.children.length) {
      // Opcional: Implementar lógica para manejar la expansión de submenús
      if (item.route) {
        this.router.navigate([item.route]);  // Navegar si hay una ruta
      }
    } else if (item.route) {
      this.router.navigate([item.route]);  // Navegar si no hay hijos
      document.querySelector('.page-wrapper')?.scrollTo(0, 0);  // Scroll al inicio de la página
    }
  }
}
