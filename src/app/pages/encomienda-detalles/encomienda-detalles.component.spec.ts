import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EncomiendaDetallesComponent } from './encomienda-detalles.component';

describe('EncomiendaDetallesComponent', () => {
  let component: EncomiendaDetallesComponent;
  let fixture: ComponentFixture<EncomiendaDetallesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EncomiendaDetallesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EncomiendaDetallesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
