import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  standalone: true
})
export class FooterComponent {
  constructor(private router: Router) {}

  pagTermosCondicoes(){
          this.router.navigate(['/termos-condicoes']);
      }

}
