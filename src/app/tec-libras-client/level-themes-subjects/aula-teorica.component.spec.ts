import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AulaTeoricaComponent } from './aula-teorica.component';

describe('AulaTeoricaComponent', () => {
  let component: AulaTeoricaComponent;
  let fixture: ComponentFixture<AulaTeoricaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AulaTeoricaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AulaTeoricaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
