import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgradecimientoComponent } from './agradecimiento.component';

describe('AgradecimientoComponent', () => {
  let component: AgradecimientoComponent;
  let fixture: ComponentFixture<AgradecimientoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AgradecimientoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AgradecimientoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
