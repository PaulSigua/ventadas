import { Component, OnInit } from '@angular/core';
import { MensajeUsuario } from 'src/app/domain/cliente';
import { ClienteService } from 'src/app/services/cliente.service';

@Component({
  selector: 'app-contactanos',
  templateUrl: './contactanos.component.html',
  styleUrls: ['./contactanos.component.scss']
})
export class ContactanosComponent implements OnInit{

  men: MensajeUsuario = new MensajeUsuario();
  hayResultados: boolean = false;
  mensajeCorrecto: boolean = false;

  constructor(private clienteServices: ClienteService){
    window.scrollTo({
      top: 0
    })
  }

  ngOnInit(): void {
    
  }

  guardarMensaje(nombreUsuario: HTMLInputElement, correo: HTMLInputElement, mensajeUsuario: HTMLTextAreaElement){
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

      this.men = mensaje;
      this.clienteServices.saveMensajeUsuario(this.men).subscribe(data => {
        console.log(data);
        this.men = new MensajeUsuario();

        this.ngOnInit();

        nombreUsuario.value = '';
        correo.value = '';
        mensajeUsuario.value = '';

        
      })
      this.mensajeCorrecto = true;
    }
  }
}
