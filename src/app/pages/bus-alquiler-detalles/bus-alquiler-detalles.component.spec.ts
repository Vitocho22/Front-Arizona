import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BusAlquilerDetallesComponent } from './bus-alquiler-detalles.component';

describe('BusAlquilerDetallesComponent', () => {
  let component: BusAlquilerDetallesComponent;
  let fixture: ComponentFixture<BusAlquilerDetallesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BusAlquilerDetallesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BusAlquilerDetallesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
