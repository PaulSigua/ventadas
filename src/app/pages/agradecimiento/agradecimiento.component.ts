import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-agradecimiento',
  templateUrl: './agradecimiento.component.html',
  styleUrl: './agradecimiento.component.scss'
})
export class AgradecimientoComponent {

  constructor (private router: Router) {}

  iralInicio(){
    this.router.navigate([('/pages/inicio')])
  }
}
