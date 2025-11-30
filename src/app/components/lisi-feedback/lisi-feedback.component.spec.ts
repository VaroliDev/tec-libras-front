import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LisiFeedbackComponent } from './lisi-feedback.component';

describe('LisiFeedbackComponent', () => {
  let component: LisiFeedbackComponent;
  let fixture: ComponentFixture<LisiFeedbackComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LisiFeedbackComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LisiFeedbackComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
