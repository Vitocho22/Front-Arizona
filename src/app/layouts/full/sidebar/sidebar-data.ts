import { NavItem } from './nav-item/nav-item';

export const navItems: NavItem[] = [

  {
    displayName: 'Dasboard',
    iconName: 'lock', // 'lock' es un ícono válido en Material Icons para login
    route: '/page/dashboard',
  },
  {
    navCap: 'ADMINISTRADOR',
  },
  {

    displayName: 'Personal',
    iconName: 'person_add', // Asegúrate de que 'sell' sea un ícono válido en Material Icons
    route: '/page/registroPersonal',
    children: [ // Añade un array de subelementos

      {
        displayName: 'Lista de Pasajeros',
        route: '/page/listaPersonal' // Ruta específica de reserva
      }
      ,
      
      {
        displayName: 'Detalle Pasajeros',
        route: '/page/detallesPersonal' // Ruta específica de reserva
      },
      {
        displayName: 'Credenciales',
        route: '/page/credenciales'
      }
      
    ]
  },

  {

    displayName: 'Buses',
    iconName: 'sell', // Asegúrate de que 'sell' sea un ícono válido en Material Icons
    route: '/page/registroBuses',
    children: [ // Añade un array de subelementos

      {
        displayName: 'Lista de Buses',
        route: '/page/listaBuses' // Ruta específica de reserva
      }
    ]
  },
  {

    displayName: 'Rutas',
    iconName: 'sell', // Asegúrate de que 'sell' sea un ícono válido en Material Icons
    route: '/page/rutasRegistro',
    children: [ // Añade un array de subelementos

      {
        displayName: 'Lista de Pasajeros',
        route: '/page/rutasLista' // Ruta específica de reserva
      }
    ]
  },



  {
    navCap: 'PERSONAL',
  },
  {

    displayName: 'Venta de pasaje',
    iconName: 'sell', // Asegúrate de que 'sell' sea un ícono válido en Material Icons
    route: '/page/registroBoletas',
    children: [ // Añade un array de subelementos

       {
        displayName: 'Reserva de pasaje',
        route: '/page/reservaPasaje' // Ruta específica de reserva
      },
      {
        displayName: 'Lista de Pasajeros',
        route: '/page/busAlquilerDetalles' // Ruta específica de reserva
      },
      {
        displayName: 'Detalle Pasajeros',
        route: '/page/detallesPasajeros' // Ruta específica de reserva
      },
      {
        displayName: 'Manifiesto',
        route: '/page/manifest/:id' // Ruta específica de reserva
      },


    ]
  },
  {
    displayName: 'Alquiler',
    iconName: 'key', // Asegúrate de que 'rental' sea un ícono válido en Material Icons
    route: '/page/registroBus',
    children: [ // Añade un array de subelementos
      {
        displayName: 'Lista Alquiler Bus',
        route: '/page/listaAlquiler' // Ruta específica de reserva
      }
      ,{
        displayName: 'Detalle Bus',
        route: '/page/busAlquilerDetalles' // Ruta específica de reserva
      }
    ]
  },
  {
    displayName: 'Encomienda',
    iconName: 'local_shipping', // 'local_shipping' es un ícono de encomienda en Material Icons
    route: '/page/registroEncomienda',
    children: [ // Añade un array de subelementos
      {
        displayName: 'Lista de Encomienda',
        route: '/page/listaEncomienda' // Ruta específica de reserva
      },
      {
        displayName: 'mapa',
        route: '/page/mapa' // Ruta específica de reserva
      },
      {
        displayName: 'Detalle Encomienda',
        route: '/page/detallesEncomienda' // Ruta específica de reserva
      },
      {
        displayName: 'unauthorized',
        route: '/page/unauthorized' // Ruta específica de reserva
      }
    ]
  },


];
