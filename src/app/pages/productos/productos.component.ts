import { Component, HostListener, OnInit } from '@angular/core';

@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.scss']
})
export class ProductosComponent implements OnInit {

  isScrolled = false;
  seccion: string = '';
  openRopa: boolean = false;
  
  categoriaSeleccionada: string | undefined = 'todos';

  constructor() {
    window.scrollTo({
      top: 0
    })
  }

  ngOnInit(): void {

  }

  @HostListener('window:scroll', [])
  windownScroll() {
    this.isScrolled = window.scrollY > 0;
  }

  mostrarCategoria(categoria: string) {
    this.categoriaSeleccionada = categoria;
    window.scrollTo({
      top: 0
    })
  }

}
