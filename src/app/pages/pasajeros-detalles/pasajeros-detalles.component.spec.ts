import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PasajerosDetallesComponent } from './pasajeros-detalles.component';

describe('PasajerosDetallesComponent', () => {
  let component: PasajerosDetallesComponent;
  let fixture: ComponentFixture<PasajerosDetallesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PasajerosDetallesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PasajerosDetallesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
