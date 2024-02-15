//Importaciones necesarias para el funcionamiento del componente
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CargarProducto, DetalleCarrito, Producto } from 'src/app/domain/cliente';
import { CuentaService } from 'src/app/services/services-cuenta/cuenta.service';
import { ProductoService } from 'src/app/services/services-producto/producto.service';

//Decorador que define el componente
@Component({
  selector: 'app-producto-detalles',
  templateUrl: './producto-detalles.component.html',
  styleUrl: './producto-detalles.component.scss'
})

//Exportacion de la clase
export class ProductoDetallesComponent implements OnInit {

  //Declaracion de variables
  producto: Producto[] = [];
  pro: Producto = new Producto();
  cargar: CargarProducto = new CargarProducto();
  det: DetalleCarrito = new DetalleCarrito();
  count: number = 1;
  usuarioLogueado: any;
  mostrarMensaje: boolean = false;

  //Constructor de la clase
  constructor(private productoService: ProductoService,
    private route: ActivatedRoute,
    private router: Router,
    private cuentaService: CuentaService) {
    window.scrollTo({
      top: 0
    })
  }

  //Ciclo de vida del componente
  ngOnInit(): void {
    const id = this.route.snapshot.params['id'];
    this.mostrarProductoExistente(id);

    this.cuentaService.obtenerUsuarioLogueado().subscribe(usuario => {
      this.usuarioLogueado = usuario;
      console.log(this.usuarioLogueado);
    })
  }

  //Metodo para incrementar la cantidad del producto
  increment() {
    this.count++;
  }

  //Metodo para disminuir la cantidad del producto
  decrement() {
    if (this.count > 1) {
      this.count--;
    }
  }

  //Metodo para mostrar el producto seleccionado
  mostrarProductoExistente(id: number) {
    this.productoService.getProductoById(id).subscribe({
      next: (productos) => {
        console.log(productos);
        this.producto = productos;
      },
      error: (error) => {
        //alert('No se encontraron resultados');
        console.error('Error al buscar productos', error);
      }
    });
  }

  //Metodo para agregar el producto al carrito
  addAlCarrito(pro: Producto) {
    if (!this.usuarioLogueado) {
      this.mostrarMensaje = true;
    } else {
      const cargarDet = {
        carrito: this.det.codigo,
        producto: pro.codigo,
        cantidad: this.count
      }

      this.cargar = cargarDet;

      this.productoService.cargarProducto(this.cargar).subscribe(data => {
        console.log(data);
        this.det = new DetalleCarrito();
        this.router.navigate([('pages/carrito')]);
      });
      console.log(this.cargar);
    }
  }
}
