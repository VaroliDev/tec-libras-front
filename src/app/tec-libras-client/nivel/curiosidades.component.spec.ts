import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CuriosidadesComponent } from './curiosidades.component';

describe('CuriosidadesComponent', () => {
  let component: CuriosidadesComponent;
  let fixture: ComponentFixture<CuriosidadesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CuriosidadesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CuriosidadesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
