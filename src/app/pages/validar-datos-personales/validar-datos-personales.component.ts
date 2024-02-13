import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DetalleCarrito, Producto } from 'src/app/domain/cliente';
import { CarritoService } from 'src/app/services-carrito/carrito.service';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-validar-datos-personales',
  templateUrl: './validar-datos-personales.component.html',
  styleUrl: './validar-datos-personales.component.scss'
})
export class ValidarDatosPersonalesComponent implements OnInit {

  productos: any;
  det: DetalleCarrito = new DetalleCarrito();
  regresar: boolean = true;

  cedula: string = '';
  nombre: string = '';
  correo: string = '';
  contrasenia: string = '';

  usuarioLogueado: any = {}; // Objeto para almacenar los datos del usuario logueado


  constructor(private usuarioService: UsuarioService,private carritoService: CarritoService,
    private router: Router) {
    window.scrollTo({
      top: 0
    })
  }

  ngOnInit(): void {
    this.productos = this.carritoService.getDetallesCarrito();
    this.usuarioLogueado = this.usuarioService.getUsuarioLogeado();
    console.log("jkdsbvhjdsbvkds "+ this.usuarioLogueado)
  }

  confirmAction() {
    const confirmation = confirm("¿Estás seguro de que quieres realizar esta acción?");

    if (confirmation) {
      console.log("Acción confirmada.");
      this.router.navigate([('/pages/carrito')]);
    } else {
      console.log("Acción cancelada.");
    }
  }

  calcularValoraPagar() {
    
  }

  continuar() {
    // Validar los datos ingresados con los datos del usuario logueado
    if (this.usuarioLogueado) {
      console.log(this.usuarioLogueado.cedula+this.usuarioLogueado.nombre+this.usuarioLogueado.correo+this.usuarioLogueado.password)
      if (
        this.cedula === this.usuarioLogueado.cedula &&
        this.nombre === this.usuarioLogueado.nombre &&
        this.correo === this.usuarioLogueado.correo &&
        this.contrasenia === this.usuarioLogueado.password
      ) {
        // Los datos coinciden, puedes continuar con la acción deseada
        this.router.navigate(['pages/sdfgf3n2s5/forma-pago']);
      } else {
        // Los datos no coinciden, puedes mostrar un mensaje de error o realizar otra acción
        alert('Los datos ingresados no coinciden con los datos del usuario logueado.');
      }
    }
  }
}
