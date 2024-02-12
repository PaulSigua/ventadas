import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ValidarDatosPersonalesComponent } from './validar-datos-personales.component';

describe('ValidarDatosPersonalesComponent', () => {
  let component: ValidarDatosPersonalesComponent;
  let fixture: ComponentFixture<ValidarDatosPersonalesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ValidarDatosPersonalesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ValidarDatosPersonalesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
