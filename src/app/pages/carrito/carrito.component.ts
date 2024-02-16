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
  mostrarBotones: boolean = true;
  productos: any[] = [];
  count: number = 1;

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
    this.mostrarBotones = false;
    this.cuentaService.obtenerUsuarioLogueado().subscribe(usuario => {
      this.usuarioLogueado = usuario;
      console.log(this.usuarioLogueado);
      console.log(this.usuarioLogueado.codigo);
      if (this.usuarioLogueado) {
        this.carritoService.getDetallesCarrito(this.usuarioLogueado.codigo)
          .subscribe(carrito => {
            this.mostrarBotones = true;
            console.log(carrito.detalles)
            this.productos = carrito.detalles; // Asignar solo los detalles de los productos
            this.registraProductos = this.productos.length === 0; // Verificar si hay productos registrados
          });
      }
    });
    this.isLoggedIn = this.cuentaService.isLoggedIn;
  }

  increment() {
    this.count++;
  }

  //Metodo para disminuir la cantidad del producto
  decrement() {
    if (this.count > 1) {
      this.count--;
    }
  }

  //Metodo para navegar a otra pagina
  irAproductos() {
    this.router.navigate([('/pages/productos')]);
  }

  //Metodo para eliminar un producto del detalleCarrito
  eliminarProducto(codigo: number) {
    this.carritoService.eliminarProducto(codigo).pipe(
      catchError(error => {
        console.error('Ocurrió un error al eliminar el detalle: ', error);
        return of(null);
      }),
      finalize(() => {
        this.ngOnInit();
      })
    ).subscribe(response => {
      try {
        // Intenta analizar la respuesta como JSON
        const data = JSON.parse(response);
        console.log('Producto eliminado: ', data);
      } catch (e) {
        // Si no se puede analizar como JSON, muestra el mensaje como texto plano
        console.log('Mensaje de respuesta:', response);
      }
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