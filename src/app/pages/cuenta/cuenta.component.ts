import { Component } from '@angular/core';

@Component({
  selector: 'app-cuenta',
  templateUrl: './cuenta.component.html',
  styleUrls: ['./cuenta.component.scss']
})
export class CuentaComponent {

  constructor(){
    window.scrollTo({
      top: 0
    })
  }
}
