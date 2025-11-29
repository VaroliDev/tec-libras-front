import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TermosCondicoesComponent } from './termos-condicoes.component';

describe('TermosCondicoesComponent', () => {
  let component: TermosCondicoesComponent;
  let fixture: ComponentFixture<TermosCondicoesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TermosCondicoesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TermosCondicoesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
