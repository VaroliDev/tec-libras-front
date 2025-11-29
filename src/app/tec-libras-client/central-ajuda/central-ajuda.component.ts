import { Component } from '@angular/core';
import { HeaderComponent } from "../../components/header/header.component";
import { EndHeaderComponent } from "../../components/end-header/end-header.component";
import { HeaderSimpleComponent } from '../../components/header-simple/header-simple.component';
import { EndHeaderSimpleComponent } from "../../components/end-header-simple/end-header-simple.component";
import { FooterComponent } from "../../components/footer/footer.component";

@Component({
  selector: 'app-central-ajuda',
  imports: [HeaderComponent, HeaderSimpleComponent, EndHeaderComponent, EndHeaderSimpleComponent, FooterComponent],
  templateUrl: './central-ajuda.component.html',
  styleUrl: './central-ajuda.component.scss'
})
export class CentralAjudaComponent {
isLogged: boolean = false;

  ngOnInit(){
    const userData = localStorage.getItem('token');
    this.isLogged = false
    if(userData){
      this.isLogged = true;
    }
  }
}
