import { Component } from '@angular/core';

import { Router } from '@angular/router';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.scss']
})
export class InicioComponent {

  constructor(private router: Router){}

  irAproductos(){
    this.router.navigate([('pages/productos')]);
  }

  saveProduct(description: HTMLTextAreaElement, name: HTMLInputElement, price: HTMLInputElement, urlImage: HTMLInputElement){
    if(!name.value || !description.value || !price.value){
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

  
}
