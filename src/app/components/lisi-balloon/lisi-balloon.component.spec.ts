import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LisiBalloonComponent } from './lisi-balloon.component';

describe('LisiBalloonComponent', () => {
  let component: LisiBalloonComponent;
  let fixture: ComponentFixture<LisiBalloonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LisiBalloonComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LisiBalloonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
