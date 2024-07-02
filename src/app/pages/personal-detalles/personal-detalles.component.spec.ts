import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonalDetallesComponent } from './personal-detalles.component';

describe('PersonalDetallesComponent', () => {
  let component: PersonalDetallesComponent;
  let fixture: ComponentFixture<PersonalDetallesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PersonalDetallesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PersonalDetallesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
