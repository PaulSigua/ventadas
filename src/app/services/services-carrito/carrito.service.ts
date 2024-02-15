import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environments';
import { DetalleCarrito, Producto } from '../../domain/cliente';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CarritoService {

  constructor(private http: HttpClient) { }

  getDetallesCarrito(codigo: number){
    console.log(codigo);
    let url = environment.WA_PATH + '/carrito?codigo='+codigo
    console.log(url);
    return this.http.get<any>(url);
  }

  eliminarDetalle(codigo: number): Observable<any>{
    let url = environment.WA_PATH + '/detallesCarrito?codigo=' + codigo;
    console.log(url);
    return this.http.delete<any>(url);
  }

  getTotalPago(){
    let url = environment.WA_PATH + '/detallesCarrito/calcular?total=1';
    return this.http.get<any>(url);
  }


}