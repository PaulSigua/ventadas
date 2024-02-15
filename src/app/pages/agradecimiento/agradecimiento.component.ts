// Importacion de librerias necesarias para el funcionamiento del componente

import { Component } from '@angular/core';
import { Router } from '@angular/router';

//Decorador que define el componente
@Component({
  selector: 'app-agradecimiento',
  templateUrl: './agradecimiento.component.html',
  styleUrl: './agradecimiento.component.scss'
})

// Exportacion de la clase
export class AgradecimientoComponent {

  //Constructor de la clase
  constructor (private router: Router) {}

  //Metodo para navegar a una nueva pagina
  iralInicio(){
    this.router.navigate([('/pages/inicio')])
  }
}
