import { Component, OnInit } from '@angular/core';
import { Cliente, Detalle, Factura } from 'src/app/domain/cliente';
import { ClienteService } from 'src/app/services/cliente.service';

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.scss']
})
export class ClientesComponent implements OnInit {
  clientes: any;
  facturas: any;
  detalles: Detalle[] = [];

  cli: Cliente = new Cliente();
  fac: Factura = new Factura();
  det: Detalle = new Detalle();

  mostrarBotonGuardar: boolean = true;
  mostrarBotonActualizar: boolean = false;
  mostrarBotonCancelar: boolean = false;

  constructor(private clienteService: ClienteService) {
    window.scrollTo({
      top: 0
    })

  }

  ngOnInit(): void {
    this.clientes = this.clienteService.getClientes();
    //this.facturas = this.clienteService.getFacturas();
  }

  cancelar() {
    this.mostrarBotonGuardar = true;
    this.mostrarBotonCancelar = false;
    this.mostrarBotonActualizar = false;
    this.cli = {};
  }

  guardar() {
    if (this.cli.dni == null || this.cli.nombre == null || this.cli.direccion == null) {
      alert("Debe llenar todos los parametros")
    } else {
      this.clienteService.saveCliente(this.cli).subscribe(data => {
        console.log(data);
        if (data.codigo == 1) {
          this.cli = new Cliente();
          this.ngOnInit();
        } else {
          alert("Error al insertar" + data.message)
        }
      });
    }
  }

  actualizar() {
    this.clienteService.updateCliente(this.cli).subscribe(data => {
      console.log(data);
    });
    this.cli = {};
    this.ngOnInit();
    this.mostrarBotonCancelar = false;
    this.mostrarBotonActualizar = false;
    this.mostrarBotonGuardar = true;
  }

  editar(cliente: Cliente) {
    this.cli = { ...cliente };
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

  guardarFactura() {

    if (!this.fac.detalles) {
      this.fac.detalles = [];
    }
    this.fac.detalles = this.detalles;
    console.log(this.fac);
    this.clienteService.saveFactura(this.fac).subscribe(data => {
      console.log(data);
      if (data.codigo == 1) {
        this.fac = new Factura();
        console.log(this.fac);
        this.detalles = [];

        this.ngOnInit();
      } else {
        alert("Error al insertar" + data.message)
      }
    });
  }

  guardarDet() {
    console.log(this.det);
    const detalle = this.det;
    if (this.det) {
      this.detalles.push(detalle);
      console.log(this.detalles);
      this.det = new Detalle();
    }
  }

  calcularTotal(factura: Factura): number {
    if (factura.detalles) {
      return factura.detalles.reduce((total, detalle) => {
        const cantidad = detalle.cantidad ?? 0;
        const precio = detalle.precio ?? 0;
        const resultado = cantidad * precio;
        const v = parseFloat(resultado.toFixed(4));
        return total + v;
      }, 0);
    } else {
      return 0;
    }
  }
}

