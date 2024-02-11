import { Component, HostListener, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CargarProducto, Carrito, DetalleCarrito, Producto } from 'src/app/domain/cliente';
import { ProductoService } from 'src/app/services-producto/producto.service';

@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.scss']
})
export class ProductosComponent implements OnInit {

  productos: any;

  pro: Producto = new Producto();
  cargar: CargarProducto = new CargarProducto();
  car: Carrito = new Carrito();
  det: DetalleCarrito = new DetalleCarrito();
  detalles: DetalleCarrito[] = [];
  productosBusqueda: Producto[] = [];

  isScrolled = false;
  seccion: string = '';
  openRopa: boolean = false;
  mostrarResultados: boolean = false;
  mostrarProductos: boolean = true;

  categoriaSeleccionada: string | undefined = 'todos';

  constructor(private productoService: ProductoService,
    private router: Router) {
    window.scrollTo({
      top: 0
    })
  }

  ngOnInit(): void {
    this.productos = this.productoService.getProductos();
    window.scrollTo({
      top: 0
    })
  }

  @HostListener('window:scroll', [])
  windownScroll() {
    this.isScrolled = window.scrollY > 0;
  }

  mostrarCategoria(categoria: string) {
    this.mostrarResultados = false;
    this.mostrarProductos = true;
    if (categoria == 'ropa') {
      console.log("seleccionado")
      this.productos = this.productoService.getCategoriaRopa();
    } else if (categoria == 'tecno') {
      this.productos = this.productoService.getCategoriaTecnologia();
    } else if (categoria == 'hogar') {
      this.productos = this.productoService.getCategoriaHogar();
    } else if (categoria == 'gaming') {
      this.productos = this.productoService.getCategoriaGaming();
    } else if (categoria == 'electr') {
      this.productos = this.productoService.getCategoriaElectrodomesticos();
    } else if (categoria == 'construc') {
      this.productos = this.productoService.getCategoriaConstruccion();
    } else {
      this.productos = this.productoService.getProductos();
    }
    window.scrollTo({
      top: 0
    })
  }

  addAlCarrito(pro: Producto) {
    const cargarDet = {
      carrito: 1,
      producto: pro.codigo,//necesito tu ayuda aqui
      cantidad: 1//necesito tu ayuda aqui
    }

    this.cargar = cargarDet;

    this.productoService.cargarProducto(this.cargar).subscribe(data => {
      console.log(data);
      this.det = new DetalleCarrito();
      this.router.navigate([('pages/carrito')]);
    });
    console.log(this.cargar);
  }

  buscar(nombre: HTMLInputElement) {
    this.mostrarResultados = true;
    this.mostrarProductos = false;
    console.log('Antes de buscar', this.mostrarResultados, this.mostrarProductos);
    this.productoService.buscarProductos(nombre.value).subscribe({
      next: (productos) => {
        console.log(productos);
        this.productosBusqueda = productos; // Asegurarse de que esto sea un arreglo.
        console.log('Después de buscar', this.mostrarResultados, this.mostrarProductos);
        this.ngOnInit();
      },
      error: (error) => {
        alert('No se encontraron resultados');
        console.error('Error al buscar productos', error);
      }
    });
    this.ngOnInit();
  }

}
