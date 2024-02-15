// Importaciones necesarias para el funcionamiento del componente
import { Component, HostListener, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CargarProducto, Carrito, DetalleCarrito, Producto } from 'src/app/domain/cliente';
import { CarritoService } from 'src/app/services/services-carrito/carrito.service';
import { ProductoService } from 'src/app/services/services-producto/producto.service';

//Decorador que define el componente
@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.scss']
})

//Exportacion de la clase
export class ProductosComponent implements OnInit {

  //Declaracion de variables
  productos: any;

  pro: Producto = new Producto();
  cargar: CargarProducto = new CargarProducto();
  car: Carrito = new Carrito();
  det: DetalleCarrito = new DetalleCarrito();
  detalles: DetalleCarrito[] = [];
  productosBusqueda: Producto[] = [];
  producto: Producto [] = [];
  carrito: any;

  isScrolled = false;
  seccion: string = '';
  openRopa: boolean = false;
  mostrarResultados: boolean = false;
  mostrarProductos: boolean = true;
  hayResultados: boolean = false;

  categoriaSeleccionada: string | undefined = 'todos';

  //Constructor para la clase
  constructor(private productoService: ProductoService,
    private carritoSer: CarritoService,
    private router: Router) {
    window.scrollTo({
      top: 0
    })
    
  }

  //Metodo de ciclo de vida del componente
  ngOnInit(): void {
    this.productos = this.productoService.getProductos();
    window.scrollTo({
      top: 0
    })
  }

  //Metodo que permite controlar el menunav de las categorias
  @HostListener('window:scroll', [])
  windownScroll() {
    this.isScrolled = window.scrollY > 0;
  }

  //Metodo para mostrar las categorias utilizando condiciones
  mostrarCategoria(categoria: string) {
    this.hayResultados = false;
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

  //Metodo para agregar un producto al carrito
  addAlCarrito(pro: Producto) {
    const cargarDet = {
      carrito: this.carrito.codigo,
      producto: pro.codigo,
      cantidad: 1
    }

    this.cargar = cargarDet;

    this.productoService.cargarProducto(this.cargar).subscribe(data => {
      console.log(data);
      this.det = new DetalleCarrito();
      this.router.navigate([('pages/carrito')]);
    });
    console.log(this.cargar);
  }

  //Metodo para buscar un producto existente
  buscar(nombre: HTMLInputElement) {
    this.mostrarResultados = true;
    this.mostrarProductos = false;
    console.log('Antes de buscar', this.mostrarResultados, this.mostrarProductos);
    this.productoService.buscarProductos(nombre.value).subscribe({
      next: (productos) => {
        this.hayResultados = false;
        console.log(productos);
        this.productosBusqueda = productos;
        console.log('Después de buscar', this.mostrarResultados, this.mostrarProductos);
        this.ngOnInit();
      },
      error: (error) => {
        this.hayResultados = true;
        console.error('Error al buscar productos', error);
        this.mostrarResultados = false;
      }
    });
    this.ngOnInit();
  }

  //Metodo para mostrar el producto seleccionado
  mostrarProductoExistente(id: number) {
    this.router.navigate(['pages/producto', id]);
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

}
