import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
//animaciones
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CredencialesComponent } from './pages/credenciales/credenciales.component';

//api
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
// icons
import { TablerIconsModule } from 'angular-tabler-icons';
import * as TablerIcons from 'angular-tabler-icons/icons';

//Import all material modules
import { MaterialModule } from './material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

//Import Layouts
import { FullComponent } from './layouts/full/full.component';
import { BlankComponent } from './layouts/blank/blank.component';

// Vertical Layout
import { SidebarComponent } from './layouts/full/sidebar/sidebar.component';
import { HeaderComponent } from './layouts/full/header/header.component';
import { BrandingComponent } from './layouts/full/sidebar/branding.component';
import { AppNavItemComponent } from './layouts/full/sidebar/nav-item/nav-item.component';
//Nuevo
import { PersonalRegistroComponent } from './pages/personal-registro/personal-registro.component';
import { PersonalListaComponent } from './pages/personal-lista/personal-lista.component';
import { BusesRegistroComponent } from './pages/buses-registro/buses-registro.component';
import { BusesListaComponent } from './pages/buses-lista/buses-lista.component';

import { EncomiendaRegistroComponent } from './pages/encomienda-registro/encomienda-registro.component';
import { EncomiendaDetallesComponent } from './pages/encomienda-detalles/encomienda-detalles.component';
//VENTA PASAJE
import { BoletasRegistroComponent } from './pages/boletas-registro/boletas-registro.component';
import { ListaPasajerosPasajeComponent } from './pages/lista-pasajeros-pasaje/lista-pasajeros-pasaje.component';

//VENTA ALQUILER BUS
import { BusRegistroComponent } from './pages/bus-registro/bus-registro.component';
import { ListaAlquilerBusComponent } from './pages/lista-alquiler-bus/lista-alquiler-bus.component';
import { BusAlquilerDetallesComponent } from './pages/bus-alquiler-detalles/bus-alquiler-detalles.component';

import { PasajerosDetallesComponent } from './pages/pasajeros-detalles/pasajeros-detalles.component';
import { AppRegistroComponent } from './pages/app-registro/app-registro.component';
import { DetalleRegistroComponent } from './pages/detalle-registro/detalle-registro.component';
import { ReporteRegistroComponent } from './pages/reporte-registro/reporte-registro.component';
import { FacturaRegistroComponent } from './pages/factura-registro/factura-registro.component';
import { EstadisticaRegistroComponent } from './pages/estadistica-registro/estadistica-registro.component';
import { LineChartComponent } from './pages/graficos/line-chart/line-chart.component';
import { BarChartComponent } from './pages/graficos/bar-chart/bar-chart.component';
import { PieChartComponent } from './pages/graficos/pie-chart/pie-chart.component';
import { ListaEncomiendaComponent } from './pages/lista-encomienda/lista-encomienda.component';
import { RutasListaComponent } from './pages/rutas-lista/rutas-lista.component';
import { RutasRegistroComponent } from './pages/rutas-registro/rutas-registro.component';

import { TicketComponent } from './pages/ticket/ticket.component';
import {PersonalDetallesComponent} from './pages/personal-detalles/personal-detalles.component';
import { ManifestComponent } from './pages/manifest/manifest.component';





@NgModule({
  declarations: [
    AppComponent,
    FullComponent,
    BlankComponent,
    SidebarComponent,
    HeaderComponent,
    BrandingComponent,
    AppNavItemComponent,
    AppRegistroComponent,
    CredencialesComponent,
    ManifestComponent,

    //VENTA PASAJE
    BoletasRegistroComponent,
    ListaPasajerosPasajeComponent,

    //ALEUILER BUS
    BusRegistroComponent,
    ListaAlquilerBusComponent,
    BusAlquilerDetallesComponent,

    PasajerosDetallesComponent,
    PersonalRegistroComponent,
    PersonalRegistroComponent,
    PersonalDetallesComponent,
    BusesListaComponent,
    BusesRegistroComponent,
    EncomiendaRegistroComponent,
    EncomiendaDetallesComponent,
    ListaEncomiendaComponent,
    RutasListaComponent,
    RutasRegistroComponent,
    PersonalListaComponent,


    //VENTA PASAJE
    DetalleRegistroComponent,
    ReporteRegistroComponent,
    FacturaRegistroComponent,
    EstadisticaRegistroComponent,
    LineChartComponent,
    BarChartComponent,
    PieChartComponent,
    TicketComponent

  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    TablerIconsModule.pick(TablerIcons),
    ToastrModule.forRoot(), // ToastrModule added
    MatDialogModule,
    MatButtonModule,


  ],
  exports: [TablerIconsModule],
  bootstrap: [AppComponent],
  providers: [],
  entryComponents: [TicketComponent,PersonalDetallesComponent,PasajerosDetallesComponent,EncomiendaDetallesComponent]

})
export class AppModule {}
