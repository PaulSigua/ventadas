//Importaciones para el funcionamiento del componente
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, finalize, isEmpty, of } from 'rxjs';
import { CarritoService } from 'src/app/services/services-carrito/carrito.service';
import { CuentaService } from 'src/app/services/services-cuenta/cuenta.service';

//Decorador que define el componente
@Component({
  selector: 'app-carrito',
  templateUrl: './carrito.component.html',
  styleUrls: ['./carrito.component.scss']
})

// Exportacion de la clase
export class CarritoComponent implements OnInit {

  //variables
  detalles: any;
  registraProductos: boolean = false;
  isLoggedIn: boolean = false;
  usuarioLogueado: any;

  productos: any[] = [];

  //constructor de la clase
  constructor(private router: Router,
    private carritoService: CarritoService,
    private cuentaService: CuentaService) {
    window.scrollTo({
      top: 0
    })
  }

  //Metodo de ciclo de vida del componente
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

  //Metodo para navegar a otra pagina
  irAproductos() {
    this.router.navigate([('/pages/productos')]);
  }

  //Metodo para eliminar un producto del detalleCarrito
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

  //Metodo para iniciar la compra de los prodcutos
  comprar() {
    this.cuentaService.obtenerUsuarioLogueado().subscribe(usuario => {
      if (usuario) {
        this.usuarioLogueado = usuario;
        this.router.navigate([('/pages/datos-personales')])
      }

    }, error => {
      // Manejar errores, por ejemplo, problemas de conexión
      console.log(error)
      alert("Usted no se encuentra logueado");
      this.router.navigate([('/pages/cuenta')]);
    });

  }

}