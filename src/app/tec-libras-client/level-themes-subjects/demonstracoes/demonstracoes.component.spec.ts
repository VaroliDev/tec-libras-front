import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DemonstracoesComponent } from './demonstracoes.component';

describe('DemonstracoesComponent', () => {
  let component: DemonstracoesComponent;
  let fixture: ComponentFixture<DemonstracoesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DemonstracoesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DemonstracoesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
