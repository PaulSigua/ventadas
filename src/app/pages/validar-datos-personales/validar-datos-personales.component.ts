import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DetalleCarrito, Producto } from 'src/app/domain/cliente';
import { CarritoService } from 'src/app/services/services-carrito/carrito.service';
import { CuentaService } from 'src/app/services/services-cuenta/cuenta.service';

@Component({
  selector: 'app-validar-datos-personales',
  templateUrl: './validar-datos-personales.component.html',
  styleUrl: './validar-datos-personales.component.scss'
})
export class ValidarDatosPersonalesComponent implements OnInit {

  productos: any;
  det: DetalleCarrito = new DetalleCarrito();
  regresar: boolean = true;
  total: number = 0;

  cedula: string = '';
  nombre: string = '';
  correo: string = '';
  contrasenia: string = '';

  usuarioLogueado: any;

  constructor(private carritoService: CarritoService,
    private cuentaService: CuentaService,
    private router: Router) {
    window.scrollTo({
      top: 0
    })
  }

  ngOnInit(): void {
    this.productos = this.carritoService.getDetallesCarrito();
    this.usuarioLogueado = this.cuentaService.getUsuarioLogeado();
    this.cuentaService.obtenerUsuarioLogueado().subscribe(usuario => {
      this.usuarioLogueado = usuario;
      if(this.usuarioLogueado = usuario){
      }
    })

    this.getTotalPago();
  }

  getTotalPago(): void {
    this.carritoService.getTotalPago().subscribe({
      next: (response) => {
        this.total = response.total;
        console.log(this.total)
      },
      error: (e) => console.error(e)
    });
  }
  

  continuar(cedula: HTMLInputElement, nombre: HTMLInputElement, correo: HTMLInputElement, contrasenia: HTMLInputElement) {
    // Validar los datos ingresados con los datos del usuario logueado

    if (this.usuarioLogueado) {
      if(!cedula.value || !nombre.value || !correo.value || !contrasenia.value){
        alert("Debe rellenar todos los campos");
      } else {
        if (cedula.value == this.usuarioLogueado.cedula && nombre.value == this.usuarioLogueado.nombre 
          && correo.value == this.usuarioLogueado.correo && contrasenia.value == this.usuarioLogueado.contrasenia) {
            this.router.navigate([('/pages/forma-pago')])
        } else {
          alert("Sus datos no coinciden")
        }
      }
    }
  }
}
