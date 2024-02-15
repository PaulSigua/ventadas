//Importacion de librerias para el funcionamiento del componente
import { Component, OnInit } from '@angular/core';
import { MensajeUsuario } from 'src/app/domain/cliente';
import { ClienteService } from 'src/app/services/cliente.service';

//Decorador que define el componente
@Component({
  selector: 'app-contactanos',
  templateUrl: './contactanos.component.html',
  styleUrls: ['./contactanos.component.scss']
})

// Exportacion de la clase
export class ContactanosComponent{

  //Declaracion de variables
  men: MensajeUsuario = new MensajeUsuario();
  hayResultados: boolean = false;
  mensajeCorrecto: boolean = false;

  //Metodo constructor del componente
  constructor(private clienteServices: ClienteService){
    window.scrollTo({
      top: 0
    })
  }

  //Metodo que guarda el mensaje ingresado por los usuarios
  guardarMensaje(nombreUsuario: HTMLInputElement, correo: HTMLInputElement, mensajeUsuario: HTMLTextAreaElement){
    //Condicion para validar los datos en los inputs
    if (!nombreUsuario.value || !correo.value || !mensajeUsuario.value) {
      this.mensajeCorrecto = false;
      this.hayResultados = true;
    } else {

      this.hayResultados = false;
      const mensaje = {
        nombre: nombreUsuario.value,
        correo: correo.value,
        mensaje: mensajeUsuario.value
      }

      //Se guarda el mensaje llamando al servicio
      this.men = mensaje;
      this.clienteServices.saveMensajeUsuario(this.men).subscribe(data => {
        console.log(data);
        this.men = new MensajeUsuario();

        nombreUsuario.value = '';
        correo.value = '';
        mensajeUsuario.value = '';
        
      })
      this.mensajeCorrecto = true;
    }
  }
}
