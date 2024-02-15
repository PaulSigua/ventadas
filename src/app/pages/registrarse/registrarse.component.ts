// Importacion para el funcionamiento del componente
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Usuario } from 'src/app/domain/cliente';
import { CarritoService } from 'src/app/services/services-carrito/carrito.service';
import { CuentaService } from 'src/app/services/services-cuenta/cuenta.service';

//Decorador que define el componente
@Component({
  selector: 'app-registrarse',
  templateUrl: './registrarse.component.html',
  styleUrl: './registrarse.component.scss'
})

//Exportacion de la clase
export class RegistrarseComponent{

  //Declaracion de variables
  ocurrioUnError: boolean = false;
  ocurrioUnErrorContrasenia: boolean = false;
  todoBien: boolean = false;
  cue: Usuario = new Usuario();

  //Metodo constructor del componente
  constructor(private cuentaService: CuentaService,
    private router: Router,
    private carritoSer: CarritoService){
    window.scrollTo({
      top: 0
    })
  }

  //Metodo para registrar a los usuarios
  registrarse(nombre: HTMLInputElement, apellido: HTMLInputElement, correo: HTMLInputElement, cedula: HTMLInputElement, contrasenia: HTMLInputElement, confirmarContrasenia: HTMLInputElement){

    //condicion que valida los espacios (inputs)
    if(!nombre.value || !apellido.value || !correo.value || !cedula.value || !contrasenia.value || !confirmarContrasenia.value) {
      this.ocurrioUnError = true;
      this.ocurrioUnErrorContrasenia = false;
      this.todoBien = false;
    } else {

      const cuenta = {
        nombre: nombre.value,
        apellido: apellido.value,
        cedula: cedula.value,
        correo: correo.value,
        contrasenia: contrasenia.value
      }

      //Creacion de la cuenta
      this.cue = cuenta;
      this.cuentaService.saveUsuarios(this.cue).subscribe(data => {
        console.log(this.cue);
        console.log(data);
        this.cue = new Usuario();

        nombre.value = '';
        apellido.value = '';
        cedula.value = '';
        correo.value = '';
        contrasenia.value = '';
        confirmarContrasenia.value = '';
      })

      this.ocurrioUnError = false;
      this.ocurrioUnErrorContrasenia = false;
      this.todoBien = true;
    }
  }

  //Metodo para navegar a otro componente (Cuenta)
  irAlogin(){
    this.router.navigate([('/pages/cuenta')])
  }

}
