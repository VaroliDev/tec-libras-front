import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SinalBibliotecaComponent } from './sinal-biblioteca.component';

describe('SinalBibliotecaComponent', () => {
  let component: SinalBibliotecaComponent;
  let fixture: ComponentFixture<SinalBibliotecaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SinalBibliotecaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SinalBibliotecaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
