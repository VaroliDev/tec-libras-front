import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NivelComponent } from './nivel.component';

describe('NivelComponent', () => {
  let component: NivelComponent;
  let fixture: ComponentFixture<NivelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NivelComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NivelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
