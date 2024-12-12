import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DebitoDiretctoComponent } from './debito-diretcto.component';

describe('DebitoDiretctoComponent', () => {
  let component: DebitoDiretctoComponent;
  let fixture: ComponentFixture<DebitoDiretctoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DebitoDiretctoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DebitoDiretctoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
