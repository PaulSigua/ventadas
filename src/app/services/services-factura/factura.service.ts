import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/app/environments/environments';

@Injectable({
  providedIn: 'root'
})
export class FacturaService {

  constructor(private http: HttpClient) { }

  crearFactura(carrito: number){
    let url = environment.WA_PATH + '/facturas/guardar'
    let body = { codigo_fac: carrito };
    return this.http.post<any>(url, body);
  }

  getFacturaGenerada() {
    let url = environment.WA_PATH + '/facturas/list';
    return this.http.get<any>(url);
  }
}
