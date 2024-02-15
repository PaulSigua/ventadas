//Importaciones para el funcionamiento de la pagina
import { Component } from '@angular/core';

//Decorador que define el componente
@Component({
  selector: 'app-nosotros',
  templateUrl: './nosotros.component.html',
  styleUrls: ['./nosotros.component.scss']
})

//Exportacion de la clase
export class NosotrosComponent {

  //Constructor de la clase
  constructor(){
    window.scrollTo({
      top: 0
    })
  }
}
