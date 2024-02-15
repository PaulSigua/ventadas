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

  productos: any[] = [];

  constructor(private router: Router,
    private carritoService: CarritoService,
    private cuentaService: CuentaService) {
    window.scrollTo({
      top: 0
    })
  }

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
            this.registraProductos = this.productos.length === 0; // Verificar si hay productos registrados
          });
      }
    });
    this.isLoggedIn = this.cuentaService.isLoggedIn;
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
