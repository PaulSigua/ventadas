import { Component, HostListener, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { CuentaService } from 'src/app/services/services-cuenta/cuenta.service';
import { Usuario } from 'src/app/domain/cliente';

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

  usuarioLogueado: any;

  constructor(
    private router: Router,
    private breakpointObserver: BreakpointObserver,
    private cuentaService: CuentaService) {
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

  ngOnInit(): void {
    this.cuentaService.obtenerUsuarioLogueado().subscribe(usuario => {
      this.usuarioLogueado = usuario;
    }, error => {
      console.error("No se pudo obtener el usuario logueado", error);
    });
  }

  irAlCarrito() {
    this.router.navigate([('pages/carrito')]);
  }

  irACreacionCuenta() {
    this.router.navigate([('/pages/cuenta')]);
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
