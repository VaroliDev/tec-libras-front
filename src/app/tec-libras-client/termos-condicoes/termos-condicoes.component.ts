import { Component } from '@angular/core';
import { HeaderComponent } from "../../components/header/header.component";
import { EndHeaderComponent } from "../../components/end-header/end-header.component";
import { HeaderSimpleComponent } from '../../components/header-simple/header-simple.component';
import { EndHeaderSimpleComponent } from "../../components/end-header-simple/end-header-simple.component";
import { FooterComponent } from "../../components/footer/footer.component";

@Component({
  selector: 'app-termos-condicoes',
  imports: [HeaderComponent, EndHeaderComponent, HeaderSimpleComponent, EndHeaderSimpleComponent, FooterComponent],
  templateUrl: './termos-condicoes.component.html',
  styleUrl: './termos-condicoes.component.scss'
})
export class TermosCondicoesComponent {
isLogged: boolean = false;

  ngOnInit(){
    const userData = localStorage.getItem('token');
    this.isLogged = false
    if(userData){
      this.isLogged = true;
    }
  }
}
