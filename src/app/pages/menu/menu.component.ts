import { Component, HostListener } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent {

  pages = [
    { link: 'Inicio', path: 'pages/inicio' },
    { link: 'Productos', path: 'pages/productos' },
    { link: 'Nosotros', path: 'pages/nosotros' },
    { link: 'Contactanos', path: 'pages/contactanos' },
  ]

  isScrolled = false;

  constructor(private router: Router) { }

  irAlCarrito() {
    this.router.navigate([('pages/carrito')]);
  }


  irACreacionCuenta() {
    this.router.navigate([('pages/login')]);
  }

  @HostListener('window:scroll', [])
  windownScroll() {
    this.isScrolled = window.scrollY > 0;
  }
}
