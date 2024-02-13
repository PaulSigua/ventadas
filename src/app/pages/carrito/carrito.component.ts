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

  constructor(private router: Router,
    private carritoService: CarritoService){
    window.scrollTo({
      top: 0
    })
  }

  ngOnInit(): void {
    this.carritos = this.carritoService.getDetallesCarrito();
    this.calcularSumaTotal(this.carritos.total);
    if(this.carritos == isEmpty){
      this.registraProductos == true
    } else {
      this.registraProductos = false
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

    window.scrollTo({
      top: 300
    })
  }
  
  comprar(){
    this.router.navigate([('pages/fs2r24r/datos-personales')]);
  }

  calcularSumaTotal(total: number){
    
  }
}
