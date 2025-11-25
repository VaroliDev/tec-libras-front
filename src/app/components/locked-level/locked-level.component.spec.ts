import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LockedLevelComponent } from './locked-level.component';

describe('LockedLevelComponent', () => {
  let component: LockedLevelComponent;
  let fixture: ComponentFixture<LockedLevelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LockedLevelComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LockedLevelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
