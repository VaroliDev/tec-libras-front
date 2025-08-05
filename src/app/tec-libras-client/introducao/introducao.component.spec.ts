import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IntroducaoComponent } from './introducao.component';

describe('IntroducaoComponent', () => {
  let component: IntroducaoComponent;
  let fixture: ComponentFixture<IntroducaoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IntroducaoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IntroducaoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
