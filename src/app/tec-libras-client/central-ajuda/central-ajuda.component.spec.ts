import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CentralAjudaComponent } from './central-ajuda.component';

describe('CentralAjudaComponent', () => {
  let component: CentralAjudaComponent;
  let fixture: ComponentFixture<CentralAjudaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CentralAjudaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CentralAjudaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
