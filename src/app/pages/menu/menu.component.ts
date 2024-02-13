import { Component, HostListener, OnInit } from '@angular/core';
import {  Router } from '@angular/router';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {

  pages = [
    { link: 'Inicio', path: 'pages/inicio' },
    { link: 'Productos', path: 'pages/productos' },
    { link: 'Nosotros', path: 'pages/nosotros' },
    { link: 'Contactanos', path: 'pages/contactanos' },
  ]

  isScrolled = false;
  showSidenav = false;
  paginas = true;

  nombreUsuario: string = '';

  constructor(private usuarioService: UsuarioService,
    private router: Router,
    private breakpointObserver: BreakpointObserver) {
    this.breakpointObserver.observe([
      Breakpoints.XSmall,
      Breakpoints.Small,
      Breakpoints.Medium,
      Breakpoints.Large,
      Breakpoints.XLarge
    ]).subscribe(result => {
      this.showSidenav = !(result.matches && (result.breakpoints[Breakpoints.Large] || result.breakpoints[Breakpoints.XLarge]));
    });
  }

  // ngOnInit(): void {
  //   //this.showSidenav = false;
  // }

  ngOnInit(): void {
    // Obtén el nombre de usuario del servicio UsuarioService
    this.nombreUsuario = this.usuarioService.nombreUsuario;
  }

  irAlCarrito() {
    this.router.navigate([('pages/carrito')]);
  }

  irACreacionCuenta() {
    this.router.navigate([('pages/login')]);
  }

  @HostListener('window:scroll', [])
  windownScroll() {
    this.isScrolled = window.scrollY > 0;
    this.mostrarSideNav();
  }

  mostrarSideNav() {
    //this.showSidenav = window.innerWidth <= 1000;
  }

  mostrarPaginas() {
    this.paginas = window.innerHeight <= 500;
    this.paginas = false;
  }

  cerrarSidenav() {
    this.showSidenav = false;
  }
}
