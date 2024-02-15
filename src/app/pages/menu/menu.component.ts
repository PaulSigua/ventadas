// Importaciones de librerias necesarias para el funcionamiento del componente
import { Component, HostListener, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { CuentaService } from 'src/app/services/services-cuenta/cuenta.service';

//Decorador que define el componente
@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})

// Exportacion de la clase, tambien se implementa la interfaz OnInit
export class MenuComponent implements OnInit {

  // Declaracion de variables
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

  // Constructor del componente/clase
  constructor(
    private router: Router,
    private breakpointObserver: BreakpointObserver,
    private cuentaService: CuentaService) {
    //ajustar la visibilidad de un componente sidenav en función del tamaño de la pantalla.
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

  // Metodo de ciclo de vida del componente
  ngOnInit(): void {
    this.cuentaService.obtenerUsuarioLogueado().subscribe(usuario => {
      this.usuarioLogueado = usuario;
    }, error => {
      console.error("No se pudo obtener el usuario logueado", error);
    });
  }

  //Metodo para navegar al carrito
  irAlCarrito() {
    this.router.navigate([('pages/carrito')]);
  }

  //Metodo para navegar a la cuenta
  irACreacionCuenta() {
    this.router.navigate([('/pages/cuenta')]);
  }

  //Metodo para verificar la posición de desplazamiento vertical de la ventana
  @HostListener('window:scroll', [])
  windownScroll() {
    this.isScrolled = window.scrollY > 0;
  }

  //Metodo para cerrar el sidenav
  cerrarSidenav() {
    this.showSidenav = false;
  }
}
