import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, empty, finalize, isEmpty, of } from 'rxjs';
import { CarritoService } from 'src/app/services/services-carrito/carrito.service';
import { CuentaService } from 'src/app/services/services-cuenta/cuenta.service';

@Component({
  selector: 'app-carrito',
  templateUrl: './carrito.component.html',
  styleUrls: ['./carrito.component.scss']
})
export class CarritoComponent implements OnInit {

  carritos?: any;
  registraProductos: boolean = false;
  isLoggedIn: boolean = false;
  usuarioLogueado: any;

  constructor(private router: Router,
    private carritoService: CarritoService,
    private cuentaService: CuentaService) {
    window.scrollTo({
      top: 0
    })
  }

  ngOnInit(): void {
    this.isLoggedIn = this.cuentaService.isLoggedIn;
    this.carritos = this.carritoService.getDetallesCarrito();
    this.isLoggedIn = this.cuentaService.isLoggedIn;
    if (this.carritos == isEmpty) {
      this.registraProductos == true
    } else {
      this.registraProductos = false
    }

  }

  irAproductos() {
    this.router.navigate([('/pages/productos')]);
  }

  eliminarProducto(codigo: number) {
    this.carritoService.eliminarDetalle(codigo).pipe(
      catchError(error => {
        console.error('Ocurrió un error al eliminar el detalle: ', error);
        return of(null);
      }),
      finalize(() => {
        this.ngOnInit();
      })
    ).subscribe(data => {
      console.log('Producto eliminado: ', data);
      // Aquí puedes agregar cualquier lógica adicional que necesites
    });
  
    // No es necesario llamar a this.ngOnInit() aquí
    window.scrollTo({
      top: 300
    });
  }
  

  comprar() {
    this.cuentaService.obtenerUsuarioLogueado().subscribe(usuario => {
      if (usuario) {
        this.usuarioLogueado = usuario;
        this.router.navigate([('/pages/datos-personales')])
      }

    }, error => {
      // Manejar errores, por ejemplo, problemas de conexión

      alert("Usted no se encuentra logueado");
      this.router.navigate([('/pages/login')])
    });

  }

}
