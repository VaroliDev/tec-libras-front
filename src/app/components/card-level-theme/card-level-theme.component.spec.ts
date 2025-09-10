import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CardLevelThemeComponent } from './card-level-theme.component';

describe('CardLevelThemeComponent', () => {
  let component: CardLevelThemeComponent;
  let fixture: ComponentFixture<CardLevelThemeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CardLevelThemeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CardLevelThemeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
