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

  constructor(private clienteServices: ClienteService){
    window.scrollTo({
      top: 0
    })
  }

  ngOnInit(): void {
    
  }

  guardarMensaje(nombreUsuario: HTMLInputElement, correo: HTMLInputElement, mensajeUsuario: HTMLTextAreaElement){
    if (!nombreUsuario.value || !correo.value || !mensajeUsuario.value) {
      alert('Debe completar todos los campos')
    } else {
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
      alert('¡Su mensaje se envio de manera correcta!')
    }
  }
}
