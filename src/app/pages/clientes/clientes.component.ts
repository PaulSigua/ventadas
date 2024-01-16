import { Component, OnInit } from '@angular/core';
import { Cliente } from 'src/app/domain/cliente';
import { ClienteService } from 'src/app/services/cliente.service';

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.scss']
})
export class ClientesComponent implements OnInit {
  clientes: any;

  client: Cliente = new Cliente();

  constructor(private clienteService: ClienteService) {

  }

  ngOnInit(): void {
    this.clientes = this.clienteService.getClientes();
  }

  guardar() {
    this.clienteService.saveCliente(this.client).subscribe(data => {
      console.log(data);
      if (data.codigo == 1) {
        this.ngOnInit();
      } else {
        alert("Error al insertar" + data.message)
      }
    });
  }

}
