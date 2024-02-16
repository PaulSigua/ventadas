// Importaciones de librerias necesarias para el funcionamiento del componente
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CarritoService } from 'src/app/services/services-carrito/carrito.service';
import { CuentaService } from 'src/app/services/services-cuenta/cuenta.service';
import { FacturaService } from 'src/app/services/services-factura/factura.service';

//Decorador que define el componente
@Component({
  selector: 'app-forma-pago',
  templateUrl: './forma-pago.component.html',
  styleUrl: './forma-pago.component.scss'
})

// Exportacion de la clase
export class FormaPagoComponent implements OnInit {

  usuarioLogueado: any;
  carrito: any;
  codigo: any;
  datosErroneos: boolean = false;
  camposVacios: boolean = false;

  // Constructor del componente/clase
  constructor(private router: Router,
    private cuentSer: CuentaService,
    private carritoSer: CarritoService,
    private facturaService: FacturaService) {
    window.scrollTo({
      top: 0
    })
  }

  ngOnInit(): void {
    this.cuentSer.obtenerUsuarioLogueado().subscribe(usuario => {
      this.usuarioLogueado = usuario;
    }, error => {
      console.error("No se pudo obtener el usuario logueado", error);
    });
  }

  //Metodo continuar que valida los datos ingresados y permite finalizar la compra
  continuar() {
    const nombreTarjeta = (document.getElementById('nombreTarjeta') as HTMLInputElement).value;
    const numeroTarjeta = (document.getElementById('numeroTarjeta') as HTMLInputElement).value;
    const fechaVencimiento = (document.getElementById('fechaVencimiento') as HTMLInputElement).value;
    const codigoSeguridad = (document.getElementById('codigoSeguridad') as HTMLInputElement).value;

    // Validar el número de tarjeta usando el algoritmo de Luhn
    if (!this.validarNumeroTarjeta(numeroTarjeta)) {
      this.datosErroneos = true;
      return;
    }

    // Validar la fecha de vencimiento
    if (!this.validarFechaVencimiento(fechaVencimiento)) {
      this.datosErroneos = true;
      return;
    }

    // Validar el código de seguridad
    if (!this.validarCodigoSeguridad(codigoSeguridad)) {
      this.datosErroneos = true;
      return;
    }

    // Guardar los datos del formulario en localStorage
    localStorage.setItem('nombreTarjeta', nombreTarjeta);
    localStorage.setItem('numeroTarjeta', numeroTarjeta);
    localStorage.setItem('fechaVencimiento', fechaVencimiento);
    localStorage.setItem('codigoSeguridad', codigoSeguridad);

    // Continuar con la acción deseada si los campos pasan la validación
    this.router.navigate(['/pages/agradecimiento']);

    this.cuentSer.obtenerUsuarioLogueado().subscribe(usuario => {
      this.usuarioLogueado = usuario;
      console.log(this.usuarioLogueado);
      this.carritoSer.getCarritoPorUsuario(this.usuarioLogueado.codigo).subscribe(data => {
        console.log(data)
        this.facturaService.crearFactura(data.codigo).subscribe(
          data => {
            console.log(data);

            if (this.usuarioLogueado) {
              this.carritoSer.eliminarDetalle(this.usuarioLogueado.codigo)
                .subscribe(carrito => {
                  console.log(carrito)
                });
            }
          })
      });

    });
  }

  validarNumeroTarjeta(numeroTarjeta: string): boolean {
    // Eliminar espacios en blanco y guiones del número de tarjeta
    const cleanedNumber = numeroTarjeta.replace(/\s+/g, '').replace(/-/g, '');

    // El número de tarjeta debe tener exactamente 16 dígitos después de limpiarlo
    if (cleanedNumber.length !== 16) {
      return false;
    }

    // Implementar algoritmo de Luhn para validar el número de tarjeta
    let sum = 0;
    let doubleUp = false;
    for (let i = cleanedNumber.length - 1; i >= 0; i--) {
      let digit = parseInt(cleanedNumber.charAt(i), 10);

      if (doubleUp) {
        digit *= 2;
        if (digit > 9) {
          digit -= 9;
        }
      }

      sum += digit;
      doubleUp = !doubleUp;
    }

    return sum % 10 === 0;
  }

  //Metodo para validar la fecha de nacimiento
  validarFechaVencimiento(fechaVencimiento: string): boolean {
    // La fecha de vencimiento debe tener el formato MM/AA
    const parts = fechaVencimiento.split('/');
    if (parts.length !== 2) {
      return false;
    }

    const mes = parseInt(parts[0], 10);
    const año = parseInt(parts[1], 10);

    // Validar que el mes esté entre 1 y 12 y el año sea mayor o igual al actual
    const añoActual = new Date().getFullYear() % 100;
    return mes >= 1 && mes <= 12 && año >= añoActual;
  }

  //Validacion del codigo de seguridad
  validarCodigoSeguridad(codigoSeguridad: string): boolean {
    // El código de seguridad debe tener exactamente 3 dígitos
    return /^[0-9]{3}$/.test(codigoSeguridad);
  }

}
