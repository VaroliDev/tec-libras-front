import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BibliotecaSinaisComponent } from './biblioteca-sinais.component';

describe('BibliotecaSinaisComponent', () => {
  let component: BibliotecaSinaisComponent;
  let fixture: ComponentFixture<BibliotecaSinaisComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BibliotecaSinaisComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BibliotecaSinaisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
