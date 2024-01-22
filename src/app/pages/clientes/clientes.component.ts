import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
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
  mostrarBotonGuardar: boolean = true;
  mostrarBotonActualizar: boolean = false;
  mostrarBotonCancelar: boolean = false;

  constructor(private clienteService: ClienteService,
    private router: Router) {
    window.scrollTo({
      top: 0
    })
  }

  ngOnInit(): void {
    this.clientes = this.clienteService.getClientes();
  }

  cancelar() {
    this.mostrarBotonGuardar = true;
    this.mostrarBotonCancelar = false;
    this.mostrarBotonActualizar = false;
    this.client = {};
  }

  guardar() {
    if (this.client.codigo == null || this.client.dni == null || this.client.nombre == null || this.client.direccion == null) {
      alert("Debe llenar todos los parametros")
    } else {
      this.clienteService.saveCliente(this.client).subscribe(data => {
        console.log(data);
        if (data.codigo == 1) {
          this.client = new Cliente();
          this.ngOnInit();
        } else {
          alert("Error al insertar" + data.message)
        }
      });
    }
  }

  actualizar() {
    this.clienteService.updateCliente(this.client).subscribe(data => {
      console.log(data);
    });
    this.client = {};
    this.ngOnInit();
    this.mostrarBotonCancelar = false;
    this.mostrarBotonActualizar = false;
    this.mostrarBotonGuardar = true;
  }

  editar(cliente: Cliente) {
    this.client = { ...cliente };
    this.mostrarBotonGuardar = false;
    this.mostrarBotonCancelar = true;
    this.mostrarBotonActualizar = true;
  }

  eliminar(cliente: number) {
    this.clienteService.deleteCliente(cliente).subscribe(data => {
      console.log(data);
    });
    console.log(cliente);
    this.ngOnInit();
  }

}
