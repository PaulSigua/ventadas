// Importacion de librerias necesarias para el funcionamiento del componente
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DetalleCarrito, Producto } from 'src/app/domain/cliente';
import { CarritoService } from 'src/app/services/services-carrito/carrito.service';
import { CuentaService } from 'src/app/services/services-cuenta/cuenta.service';

//Decorador que define el componente
@Component({
  selector: 'app-validar-datos-personales',
  templateUrl: './validar-datos-personales.component.html',
  styleUrl: './validar-datos-personales.component.scss'
})

//Exportacion de la clase
export class ValidarDatosPersonalesComponent implements OnInit {

  //Declaracion de variables
  productos: any;
  det: DetalleCarrito = new DetalleCarrito();
  regresar: boolean = true;
  total: number = 0;

  usuarioLogueado: any;
  datosErroneos: boolean = false;
  camposVacios: boolean = false;

  //Constructor para el componente
  constructor(private carritoService: CarritoService,
    private cuentaService: CuentaService,
    private router: Router) {
    window.scrollTo({
      top: 0
    })
  }

  //Metodo para el ciclo de vida del componente
  ngOnInit(): void {
    this.cuentaService.obtenerUsuarioLogueado().subscribe(usuario => {
      this.usuarioLogueado = usuario;
      console.log(this.usuarioLogueado);
      console.log(this.usuarioLogueado.codigo);
      if (this.usuarioLogueado) {
        this.carritoService.getDetallesCarrito(this.usuarioLogueado.codigo)
          .subscribe(carrito => {
            console.log(carrito.detalles)
            this.productos = carrito.detalles; // Asignar solo los detalles de los productos
          });
      }
    });
  }

  //Metodo que permite continuar con la adquisicion de productos a traves de una validacion de los datos alamacenados
  // en la base de datos
  continuar(cedula: HTMLInputElement, nombre: HTMLInputElement, correo: HTMLInputElement, contrasenia: HTMLInputElement) {
    //Condicion que valida que el usuario este logueadp
    if (this.usuarioLogueado) {
          // Validar los datos ingresados con los datos del usuario logueado
      if (!cedula.value || !nombre.value || !correo.value || !contrasenia.value) {
        this.datosErroneos = false;
        this.camposVacios = true;
      } else {
        if (cedula.value == this.usuarioLogueado.cedula && nombre.value == this.usuarioLogueado.nombre
          && correo.value == this.usuarioLogueado.correo && contrasenia.value == this.usuarioLogueado.contrasenia) {
          this.router.navigate([('/pages/forma-pago')])
        } else {
          this.datosErroneos = true;
          this.camposVacios = false;
        }
      }
    }
  }
}
