import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderSimpleComponent } from './header-simple.component';

describe('HeaderSimpleComponent', () => {
  let component: HeaderSimpleComponent;
  let fixture: ComponentFixture<HeaderSimpleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HeaderSimpleComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HeaderSimpleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
