import { Component } from '@angular/core';
import { Cuenta } from 'src/app/domain/cliente';
import { CuentaService } from 'src/app/services/services-cuenta/cuenta.service';

@Component({
  selector: 'app-cuenta',
  templateUrl: './cuenta.component.html',
  styleUrls: ['./cuenta.component.scss']
})
export class CuentaComponent {

  mostrarFormularioEstatico: boolean = false;
  mostrarFormulario: boolean = true;
  ocurrioUnError: boolean = false;
  todoBien: boolean = false;
  cue: Cuenta = new Cuenta();

  constructor(private cuentaService: CuentaService){
    window.scrollTo({
      top: 0
    })
  }

  login(){
    this.mostrarFormularioEstatico = false;
    this.mostrarFormulario = true;
  }

  registrarse(nombre: HTMLInputElement, correo: HTMLInputElement, contrasenia: HTMLInputElement, confirmarContrasenia: HTMLInputElement){
    this.mostrarFormularioEstatico = true;
    this.mostrarFormulario = false;

    if(!nombre.value || !correo.value || !contrasenia.value || !confirmarContrasenia.value) {
      this.ocurrioUnError = true;
    }
  }
}
