import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EndHeaderSimpleComponent } from './end-header-simple.component';

describe('EndHeaderSimpleComponent', () => {
  let component: EndHeaderSimpleComponent;
  let fixture: ComponentFixture<EndHeaderSimpleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EndHeaderSimpleComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EndHeaderSimpleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
