import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LevelThemesComponent } from './level-themes.component';

describe('LevelThemesComponent', () => {
  let component: LevelThemesComponent;
  let fixture: ComponentFixture<LevelThemesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LevelThemesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LevelThemesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
