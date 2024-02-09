import { Component, HostListener, OnInit } from '@angular/core';
import { Categoria, Producto } from 'src/app/domain/cliente';
import { ProductoService } from 'src/app/services-producto/producto.service';

@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.scss']
})
export class ProductosComponent implements OnInit {

  productos: any;

  pro: Producto = new Producto();

  isScrolled = false;
  seccion: string = '';
  openRopa: boolean = false;

  categoriaSeleccionada: string | undefined = 'todos';

  constructor(private productoService: ProductoService) {
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
}
