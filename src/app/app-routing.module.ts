import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BlankComponent } from './layouts/blank/blank.component';
import { FullComponent } from './layouts/full/full.component';
import { PersonalRegistroComponent } from './pages/personal-registro/personal-registro.component';
import { BusRegistroComponent } from './pages/bus-registro/bus-registro.component';
import { BoletasRegistroComponent } from './pages/boletas-registro/boletas-registro.component';
import { EncomiendaRegistroComponent } from './pages/encomienda-registro/encomienda-registro.component';
import { ListaPasajerosPasajeComponent } from './pages/lista-pasajeros-pasaje/lista-pasajeros-pasaje.component';
import { ListaAlquilerBusComponent } from './pages/lista-alquiler-bus/lista-alquiler-bus.component';
import { ListaEncomiendaComponent } from './pages/lista-encomienda/lista-encomienda.component';
import { RutasRegistroComponent } from './pages/rutas-registro/rutas-registro.component';
import { RutasListaComponent } from './pages/rutas-lista/rutas-lista.component';
import { PasajerosDetallesComponent } from './pages/pasajeros-detalles/pasajeros-detalles.component';
import {PersonalDetallesComponent} from './pages/personal-detalles/personal-detalles.component';
import { BusAlquilerDetallesComponent } from './pages/bus-alquiler-detalles/bus-alquiler-detalles.component';
import { TicketComponent } from './pages/ticket/ticket.component';
import { EncomiendaDetallesComponent} from './pages/encomienda-detalles/encomienda-detalles.component';
import { PersonalListaComponent } from './pages/personal-lista/personal-lista.component';
import { BusesRegistroComponent } from './pages/buses-registro/buses-registro.component';
import { BusesListaComponent } from './pages/buses-lista/buses-lista.component';
import { MapaComponent } from './pages/mapa/mapa.component';
import { AdminGuard } from './guards/admin.guard';
import { UserGuard } from './guards/user.guard';
import { DriverGuard } from './guards/driver.guard';
import { UnauthorizedComponent } from './pages/unauthorized/unauthorized.component';
import { UserDriverGuard } from './guards/user-driver.guard';
import { CredencialesComponent } from './pages/credenciales/credenciales.component';
import { ManifestComponent } from './pages/manifest/manifest.component';

const routes: Routes = [
  {
    path: '',
    component: BlankComponent,
    children: [
      {
        path: '',
        loadChildren: () =>
          import('./pages/authentication/authentication.module').then(
            (m) => m.AuthenticationModule
          ),
      },
    ],
  },
  {
    path: 'page',
    component: FullComponent,
    children: [
      {
        path: 'dashboard',
        loadChildren: () =>
          import('./pages/pages.module').then((m) => m.PagesModule),
        canActivate: [UserDriverGuard] // Solo los administradores pueden acceder a esta ruta
      },
      {
        path: 'ui-components',
        loadChildren: () =>
          import('./pages/ui-components/ui-components.module').then(
            (m) => m.UicomponentsModule
          ),
        canActivate: [UserDriverGuard] // Solo los administradores pueden acceder a esta ruta
      },
      {
        path: 'extra',
        loadChildren: () =>
          import('./pages/extra/extra.module').then((m) => m.ExtraModule),
        canActivate: [UserDriverGuard] // Solo los administradores pueden acceder a esta ruta
      },
      // Personal
      {
        path: "registroPersonal", component: PersonalRegistroComponent, canActivate: [AdminGuard]
      },
      {
        path: "registroPersonal/:id", component: PersonalRegistroComponent, canActivate: [AdminGuard]
      },
      {
        path: "listaPersonal", component: PersonalListaComponent, canActivate: [AdminGuard]
      },
      {
        path: "detallesPersonal/:id", component: PersonalDetallesComponent, canActivate: [AdminGuard]
      },
      {
        path: "detallesPersonal", component: PersonalDetallesComponent, canActivate: [AdminGuard]
      },
      {
        path: "ticket", component: TicketComponent, canActivate: [AdminGuard]
      },

    

    
      // Buses
      {
        path: "registroBuses", component: BusesRegistroComponent, canActivate: [AdminGuard]
      },
      {
        path: "registroBuses/:id", component: BusesRegistroComponent, canActivate: [AdminGuard]
      },
      {
        path: "listaBuses", component: BusesListaComponent, canActivate: [AdminGuard]
      },
      // Rutas
      {
        path: "credenciales", component: CredencialesComponent, canActivate: [AdminGuard]
      },

      {
        path: "rutasRegistro", component: RutasRegistroComponent, canActivate: [AdminGuard]
      },
      {
        path: 'registroRutas/:id', component: RutasRegistroComponent, canActivate: [AdminGuard]
      },
      {
        path: "rutasLista", component: RutasListaComponent, canActivate: [AdminGuard]
      },
      // Pasajeros
      {
        path: "registroBoletas", component: BoletasRegistroComponent, canActivate: [UserGuard]
      },
      {
        path: "registroBoletas/:id", component: BoletasRegistroComponent, canActivate: [UserGuard]
      },
      {
        path: "listaPasajeros", component: ListaPasajerosPasajeComponent, canActivate: [UserGuard]

      },
      {
        path: "detallesPasajero/:id", component: PasajerosDetallesComponent, canActivate: [UserGuard]
      },
      {
        path: "manifest/:id", component: ManifestComponent, canActivate: [UserGuard]
      },

      
      // Alquiler
      {
        path: "registroBus", component: BusRegistroComponent, canActivate: [UserGuard]
      },
      {
        path: 'editaralquiler/:id', component: BusRegistroComponent, canActivate: [UserGuard]
      },
      {
        path: "listaAlquiler", component: ListaAlquilerBusComponent, canActivate: [UserGuard]
      },
      {
        path: "busAlquilerDetalles/:id", component: BusAlquilerDetallesComponent, canActivate: [UserGuard]
      },



      // Encomienda
      {
        path: "registroEncomienda", component: EncomiendaRegistroComponent, canActivate: [UserDriverGuard]
      },
      {
        path: "registroEncomienda/:id", component: EncomiendaRegistroComponent, canActivate: [UserDriverGuard]
      },
      {
        path: "listaEncomienda", component: ListaEncomiendaComponent, canActivate: [UserDriverGuard]
      },
      {
        path: "mapa", component: MapaComponent, canActivate: [UserDriverGuard]
      },
      {
        path: "detallesEncomienda", component: EncomiendaDetallesComponent, canActivate: [UserDriverGuard]
      },
      {
        path: "detallesEncomienda/:id", component: EncomiendaDetallesComponent, canActivate: [UserDriverGuard]
      },



      {
        path: 'unauthorized',
        component: UnauthorizedComponent // Componente para usuarios no autorizados
      }
    ],
  },
  //{
    //path: 'unauthorized',
    //component: UnauthorizedComponent // Componente para usuarios no autorizados
  //}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
