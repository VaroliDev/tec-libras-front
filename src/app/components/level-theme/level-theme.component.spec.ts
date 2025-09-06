import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LevelThemeComponent } from './level-theme.component';

describe('LevelThemeComponent', () => {
  let component: LevelThemeComponent;
  let fixture: ComponentFixture<LevelThemeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LevelThemeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LevelThemeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
