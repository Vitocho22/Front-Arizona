import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Personal } from 'src/app/models/personal';
import { PersonalService } from 'src/app/services/personal.service';

@Component({
  selector: 'app-personal-registro',
  templateUrl: './personal-registro.component.html',
  styleUrls: ['./personal-registro.component.scss']
})
export class PersonalRegistroComponent implements OnInit {
  personalForm: FormGroup;
  editMode: boolean = false;
  personalId: number | null = null;

  constructor(
    private fb: FormBuilder,
    private personalService: PersonalService,
    private toastr: ToastrService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.personalForm = this.fb.group({
      nombres: ['', Validators.required],
      apellidos: ['', Validators.required],
      nroDNI: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(8)]],
      edad: ['', Validators.required],
      genero: ['', Validators.required],
      fechaNacimiento: ['', Validators.required],
      celular: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      direccion: ['', Validators.required],
      departamento: ['', Validators.required],
      provincia: ['', Validators.required],
      distrito: ['', Validators.required],
      perfil: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      if (params['id']) {
        this.editMode = true;
        this.personalId = +params['id'];
        this.personalService.getPersonalById(this.personalId).subscribe(
          (personal: Personal) => {
            this.personalForm.patchValue(personal);
          },
          error => {
            console.error('Error al cargar el personal:', error);
            this.toastr.error('Hubo un error al cargar el personal', 'Error');
          }
        );
      }
    });
  }

  guardarPersonal(): void {
    if (this.editMode && this.personalId !== null) {
      this.personalService.updatePersonal(this.personalId, this.personalForm.value).subscribe(
        personalActualizado => {
          this.toastr.success('El personal se ha actualizado exitosamente', 'Éxito');
          this.router.navigate(['/page/listaPersonal']);
        },
        error => {
          console.error('Error al actualizar el personal:', error);
          this.toastr.error('Hubo un error al actualizar el personal', 'Error');
        }
      );
    } else {
      this.personalService.createPersonal(this.personalForm.value).subscribe(
        (data: Personal) => {
          this.toastr.success('El personal se ha creado exitosamente', 'Éxito');
          this.router.navigate(['/page/listaPersonal']);
        },
        error => {
          console.error('Error al crear el personal:', error);
          this.toastr.error('Hubo un error al crear el personal', 'Error');
        }
      );
    }
  }

  
}
