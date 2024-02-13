import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Cuenta } from 'src/app/domain/cliente';
import { CuentaService } from 'src/app/services/services-cuenta/cuenta.service';

@Component({
  selector: 'app-registrarse',
  templateUrl: './registrarse.component.html',
  styleUrl: './registrarse.component.scss'
})
export class RegistrarseComponent implements OnInit{

  ocurrioUnError: boolean = false;
  ocurrioUnErrorContrasenia: boolean = false;
  todoBien: boolean = false;
  cue: Cuenta = new Cuenta();

  constructor(private cuentaService: CuentaService,
    private router: Router){
    window.scrollTo({
      top: 0
    })
  }

  ngOnInit(): void {
    
  }

  registrarse(nombre: HTMLInputElement, apellido: HTMLInputElement, correo: HTMLInputElement, contrasenia: HTMLInputElement, confirmarContrasenia: HTMLInputElement){

    if(!nombre.value || !apellido.value || !correo.value || !contrasenia.value || !confirmarContrasenia.value) {
      this.ocurrioUnError = true;
      this.ocurrioUnErrorContrasenia = false;
      this.todoBien = false;
    } else if (contrasenia.value != confirmarContrasenia.value) {
      this.ocurrioUnError = false;
      this.ocurrioUnErrorContrasenia = true;
      this.todoBien = false;
    } else {
      this.ocurrioUnError = false;
      this.ocurrioUnErrorContrasenia = false;
      this.todoBien = true;

      const cuenta = {
        nombre: nombre.value,
        apellido: apellido.value,
        correo: correo.value,
        contrasenia: contrasenia.value
      }

      this.cue = cuenta;
      this.cuentaService.saveCuentas(this.cue).subscribe(data => {
        console.log(data);
        this.cue = new Cuenta();
        this.ngOnInit();

      })
    }
  }

  irAlogin(){
    this.router.navigate([('/pages/login')])
  }
}
