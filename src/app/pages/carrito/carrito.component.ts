import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-carrito',
  templateUrl: './carrito.component.html',
  styleUrls: ['./carrito.component.scss']
})
export class CarritoComponent {

  constructor(private router: Router){
    window.scrollTo({
      top: 0
    })
  }

  irAproductos(){
    this.router.navigate([('/pages/productos')]);
  }
}
