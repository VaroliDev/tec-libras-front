import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AulaPraticaComponent } from './aula-pratica.component';

describe('AulaPraticaComponent', () => {
  let component: AulaPraticaComponent;
  let fixture: ComponentFixture<AulaPraticaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AulaPraticaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AulaPraticaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
