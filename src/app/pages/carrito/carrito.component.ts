import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, empty, finalize, isEmpty, of } from 'rxjs';
import { Carrito, Producto } from 'src/app/domain/cliente';
import { CarritoService } from 'src/app/services-carrito/carrito.service';
import { ProductoService } from 'src/app/services-producto/producto.service';

@Component({
  selector: 'app-carrito',
  templateUrl: './carrito.component.html',
  styleUrls: ['./carrito.component.scss']
})
export class CarritoComponent implements OnInit{

  carritos?: any;
  registraProductos: boolean = false;
  count: number = 1;

  constructor(private router: Router,
    private carritoService: CarritoService){
    window.scrollTo({
      top: 0
    })
  }

  ngOnInit(): void {
    this.carritos = this.carritoService.getDetallesCarrito();
    if(this.carritos == isEmpty){
      this.registraProductos == true
    } else {
      this.registraProductos = false
    }

  }

  increment() {
    this.count++;
  }

  decrement() {
    if (this.count > 1) {
      this.count--;
    }
  }

  irAproductos(){
    this.router.navigate([('/pages/productos')]);
  }

  eliminarProducto(codigo: number) {
    this.carritoService.eliminarDetalle(codigo).pipe(
      catchError(error => {
        //console.error('Ocurrió un error al eliminar el detalle: ', error);
        return of(null);
      }),
      finalize(() => {
        this.ngOnInit();
      })
    ).subscribe(data => {
      console.log('Producto eliminado: ', data);
    });
    this.ngOnInit();
  }
  
  comprar(){
    this.router.navigate([('pages/fs2r24r/datos-personales')]);
  }
}
