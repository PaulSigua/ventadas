// Importaciones de librerias necesarias para el funcionamiento del componente
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ProductoService } from 'src/app/services/services-producto/producto.service';

//Decorador que define el componente
@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.scss']
})
// Exportacion de la clase
export class InicioComponent implements OnInit{

  // Declaracion de variables
  productos: any;
  producto: any [] = [];
  @ViewChild('productContainer')
  productContainer!: ElementRef;

  // Constructor del componente/clase
  constructor(private router: Router,
    private productoService: ProductoService) {
    window.scrollTo({
      top: 0
    })
  }

  // Metodo de ciclo de vida del componente
  ngOnInit(): void {
    this.productos = this.productoService.getProductos();
  }

  //Metodo para navegar a otra pagina
  irAproductos() {
    this.router.navigate([('pages/productos')]);
  }

  //Metodo scroll que permite manejar el carrusel
  scroll(direction: number): void {
    const container = this.productContainer.nativeElement;
    const containerWidth = container.offsetWidth;
    const scrollStep = containerWidth / 2; // Ajusta este valor según prefieras

    // Anima el desplazamiento
    container.scroll({
      left: container.scrollLeft + direction * scrollStep,
      behavior: 'smooth'
    });
  }

  //Metodo que muestra el producto segun sea elegido
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

