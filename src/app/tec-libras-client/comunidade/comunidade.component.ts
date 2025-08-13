import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { OnInit } from '@angular/core';

@Component({
  selector: 'app-comunidade',
  imports: [],
  templateUrl: './comunidade.component.html',
  styleUrl: './comunidade.component.scss'
})
export class ComunidadeComponent {

  constructor(private routes: Router) {}

  ngOnInit(): void {
    this.routes.navigate(['/inicio']);
  }
}