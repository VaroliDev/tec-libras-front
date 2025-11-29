import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EndHeaderComponent } from './end-header.component';

describe('EndHeaderComponent', () => {
  let component: EndHeaderComponent;
  let fixture: ComponentFixture<EndHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EndHeaderComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EndHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
