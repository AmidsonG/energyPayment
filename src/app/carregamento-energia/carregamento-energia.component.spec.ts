import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CarregamentoEnergiaComponent } from './carregamento-energia.component';

describe('CarregamentoEnergiaComponent', () => {
  let component: CarregamentoEnergiaComponent;
  let fixture: ComponentFixture<CarregamentoEnergiaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CarregamentoEnergiaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CarregamentoEnergiaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
