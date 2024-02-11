import { Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';

import { Router } from '@angular/router';
import { ProductoService } from 'src/app/services-producto/producto.service';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.scss']
})
export class InicioComponent implements OnInit{

  productos: any;

  @ViewChild('productContainer')
  productContainer!: ElementRef;

  constructor(private router: Router,
    private productoService: ProductoService) {
    window.scrollTo({
      top: 0
    })
  }

  ngOnInit(): void {
    this.productos = this.productoService.getProductos();
  }

  irAproductos() {
    this.router.navigate([('pages/productos')]);
  }

  saveProduct(description: HTMLTextAreaElement, name: HTMLInputElement, price: HTMLInputElement, urlImage: HTMLInputElement) {
    if (!name.value || !description.value || !price.value) {
      alert('Llene todos los campos');
      return false;
    } else {
      const product = {
        name: name.value,
        description: description.value,
        price: price.valueAsNumber,
        urlImage: urlImage.value
      }

      //this.apiSer.saveProducts(product);
      return false;
    }
  }

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
}

