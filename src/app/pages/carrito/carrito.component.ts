import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, empty, finalize, isEmpty, of } from 'rxjs';
import { Carrito, Producto } from 'src/app/domain/cliente';
import { CarritoService } from 'src/app/services-carrito/carrito.service';
import { ProductoService } from 'src/app/services-producto/producto.service';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-carrito',
  templateUrl: './carrito.component.html',
  styleUrls: ['./carrito.component.scss']
})
export class CarritoComponent implements OnInit{

  carritos?: any;
  registraProductos: boolean = false;
  count: number = 1;

  isLoggedIn: boolean = false;

  constructor(private usuarioService: UsuarioService,private router: Router,
    private carritoService: CarritoService){
    window.scrollTo({
      top: 0
    })
  }

  ngOnInit(): void {
    this.isLoggedIn = this.usuarioService.isLoggedIn;
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
    console.log(this.isLoggedIn)
    if (this.isLoggedIn) { // Comprueba si el usuario está logeado
      this.router.navigate([('pages/fs2r24r/datos-personales')]);
    } else {
      // Si el usuario no está logeado, redirige a la página de inicio de sesión
      this.router.navigate(['pages/login']);
    }
    
    // this.router.navigate([('pages/fs2r24r/datos-personales')]);
  }
}
