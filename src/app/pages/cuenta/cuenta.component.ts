import { Component } from '@angular/core';

@Component({
  selector: 'app-cuenta',
  templateUrl: './cuenta.component.html',
  styleUrls: ['./cuenta.component.scss']
})
export class CuentaComponent {

  mostrarFormularioEstatico: boolean = false;
  mostrarFormulario: boolean = true;
  constructor(){
    window.scrollTo({
      top: 0
    })
  }

  login(){
    this.mostrarFormularioEstatico = false;
    this.mostrarFormulario = true;
  }

  registrarse(){
    this.mostrarFormularioEstatico = true;
    this.mostrarFormulario = false;
  }
}
