import { Component } from '@angular/core';

@Component({
  selector: 'app-branding',
  template: `
    <div class="branding">
      <style>
        .branding {
          display: flex;
          align-items: center; /* Asegura que el logo y el texto estén alineados verticalmente */
          background-color: #152027; /* Fondo oscuro como en la imagen */
          padding: 1rem; /* Espaciado alrededor del contenido */
        }
        img {
          width: auto; /* Mantiene la proporción del logo */
          height: 50px; /* Altura del logo, ajusta según necesidad */
        }
        .branding-text {
          color: #ffffff; /* Texto blanco */
          font-size: 20px; /* Tamaño del texto como en la imagen */
          font-weight: bold; /* Texto en negrita */
          margin-left: 10px; /* Espacio entre el logo y el texto */
        }
      </style>
      <a href="/">
        <img
          src="./assets/images/dashboard/logo.png"
          alt="Logo"
          class="align-middle m-2"
        />
        <span class="branding-text">Etrans Arizona</span>
      </a>
    </div>
  `,
})
export class BrandingComponent {}
