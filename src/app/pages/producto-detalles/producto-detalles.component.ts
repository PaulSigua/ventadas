import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CargarProducto, DetalleCarrito, Producto } from 'src/app/domain/cliente';
import { ProductoService } from 'src/app/services/services-producto/producto.service';

@Component({
  selector: 'app-producto-detalles',
  templateUrl: './producto-detalles.component.html',
  styleUrl: './producto-detalles.component.scss'
})
export class ProductoDetallesComponent implements OnInit{

  producto: Producto [] = [];
  pro: Producto = new Producto();
  cargar: CargarProducto = new CargarProducto();
  det: DetalleCarrito = new DetalleCarrito();
  count: number = 1;

  constructor (private productoService: ProductoService,
    private route: ActivatedRoute,
    private router: Router) {
      window.scrollTo({
        top: 0
      })
    }

  ngOnInit(): void {
    const id = this.route.snapshot.params['id'];
    this.mostrarProductoExistente(id);
  }

  
  increment() {
    this.count++;
  }

  decrement() {
    if (this.count > 1) {
      this.count--;
    }
  }


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

  addAlCarrito(pro: Producto) {
    const cargarDet = {
      carrito: 1,
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
