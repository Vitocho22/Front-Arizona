import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { RegistroVehiculo } from 'src/app/models/registro';
import { RegistrovehiculoService } from 'src/app/services/registrovehiculo.service';


@Component({
  selector: 'app-app-registro',
  templateUrl: './app-registro.component.html',
  styleUrls: ['./app-registro.component.scss']
})
export class AppRegistroComponent {

  registroForm: FormGroup;

  constructor(private fb: FormBuilder,
    private router: Router,
    private _registroService: RegistrovehiculoService) {
    this.registroForm = this.fb.group({
      placa: ['', Validators.required],
      imagenPath: ['', Validators.required],
      idUsuario: [2]
    })
  }

  agregarRegistro() {
    const REGISTROVEHICULO: RegistroVehiculo = {
      placa: this.registroForm.get('placa')?.value,
      imagenPath: this.registroForm.get('imagenPath')?.value,
      idUsuario: 2,
    }
    console.log('Datos enviados:', REGISTROVEHICULO);

    this._registroService.postRegistroVehiculo(REGISTROVEHICULO).subscribe(
      data => {
        console.log(data);
        this.router.navigate(['/dashboard']);
      },
      error => {
        console.error('Error al registrar el vehículo:', error);
        // Agrega lógica para manejar el error, como mostrar un mensaje al usuario.
      }
    );
  }
}
