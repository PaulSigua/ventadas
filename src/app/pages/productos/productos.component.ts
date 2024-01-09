import { Component, HostListener } from '@angular/core';

@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.scss']
})
export class ProductosComponent {

  isScrolled = false;

  constructor(){
    window.scrollTo({
      top: 0
    })
  }

  @HostListener('window:scroll', [])
  windownScroll() {
    this.isScrolled = window.scrollY > 0;
  }
}
