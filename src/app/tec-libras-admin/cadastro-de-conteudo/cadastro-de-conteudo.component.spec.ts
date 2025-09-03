import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CadastroDeConteudoComponent } from './cadastro-de-conteudo.component';

describe('CadastroDeConteudoComponent', () => {
  let component: CadastroDeConteudoComponent;
  let fixture: ComponentFixture<CadastroDeConteudoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CadastroDeConteudoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CadastroDeConteudoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
