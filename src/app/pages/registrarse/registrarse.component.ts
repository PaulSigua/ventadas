import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Usuario } from 'src/app/domain/cliente';
import { CarritoService } from 'src/app/services/services-carrito/carrito.service';
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
  cue: Usuario = new Usuario();

  constructor(private cuentaService: CuentaService,
    private router: Router,
    private carritoSer: CarritoService){
    window.scrollTo({
      top: 0
    })
  }

  ngOnInit(): void {
    
  }

  registrarse(nombre: HTMLInputElement, apellido: HTMLInputElement, correo: HTMLInputElement, cedula: HTMLInputElement, contrasenia: HTMLInputElement, confirmarContrasenia: HTMLInputElement){

    if(!nombre.value || !apellido.value || !correo.value || !cedula.value || !contrasenia.value || !confirmarContrasenia.value) {
      this.ocurrioUnError = true;
      this.ocurrioUnErrorContrasenia = false;
      this.todoBien = false;
    } else {
      this.ocurrioUnError = false;
      this.ocurrioUnErrorContrasenia = false;
      this.todoBien = true;

      const cuenta = {
        nombre: nombre.value,
        apellido: apellido.value,
        cedula: cedula.value,
        correo: correo.value,
        contrasenia: contrasenia.value
      }

      this.cue = cuenta;
      this.cuentaService.saveUsuarios(this.cue).subscribe(data => {
        console.log(data);
        this.cue = new Usuario();
        this.ngOnInit();

      })
    }
  }

  irAlogin(){
    this.router.navigate([('/pages/cuenta')])
  }

  /*crearCarritoAlIniciar(usuario: number): void {
    this.carritoSer.crearCarrito(usuario).subscribe({
      next: (carrito) => {
        const car = {
          codigo: carrito,
          cuenta: this.usuarioLogueado.codigo
        }

        console.log(car);
        this.carrito = car;
        console.log('Carrito creado con éxito', carrito);
      },
      error: (error) => {
        console.error('Error al crear el carrito', error);
      }
    });
  }*/
}
