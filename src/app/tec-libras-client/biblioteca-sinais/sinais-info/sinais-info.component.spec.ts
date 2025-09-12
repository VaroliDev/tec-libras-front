import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SinaisInfoComponent } from './sinais-info.component';

describe('SinaisInfoComponent', () => {
  let component: SinaisInfoComponent;
  let fixture: ComponentFixture<SinaisInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SinaisInfoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SinaisInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
