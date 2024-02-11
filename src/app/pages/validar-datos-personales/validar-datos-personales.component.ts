import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DetalleCarrito, Producto } from 'src/app/domain/cliente';
import { CarritoService } from 'src/app/services-carrito/carrito.service';

@Component({
  selector: 'app-validar-datos-personales',
  templateUrl: './validar-datos-personales.component.html',
  styleUrl: './validar-datos-personales.component.scss'
})
export class ValidarDatosPersonalesComponent implements OnInit {

  productos: any;
  det: DetalleCarrito = new DetalleCarrito();
  regresar: boolean = true;

  constructor(private carritoService: CarritoService,
    private router: Router) {
    window.scrollTo({
      top: 0
    })
  }

  ngOnInit(): void {
    this.productos = this.carritoService.getDetallesCarrito();
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
}