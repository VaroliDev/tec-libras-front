import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SinalComponent } from './sinal.component';

describe('SinalComponent', () => {
  let component: SinalComponent;
  let fixture: ComponentFixture<SinalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SinalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SinalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
