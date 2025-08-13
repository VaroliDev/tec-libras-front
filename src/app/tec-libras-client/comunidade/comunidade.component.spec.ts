import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComunidadeComponent } from './comunidade.component';

describe('ComunidadeComponent', () => {
  let component: ComunidadeComponent;
  let fixture: ComponentFixture<ComunidadeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ComunidadeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ComunidadeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
