import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HistoricoRecargasComponent } from './historico-recargas.component';

describe('HistoricoRecargasComponent', () => {
  let component: HistoricoRecargasComponent;
  let fixture: ComponentFixture<HistoricoRecargasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HistoricoRecargasComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HistoricoRecargasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
