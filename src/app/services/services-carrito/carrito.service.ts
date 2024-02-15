// Importaciones necesarias para el funcionamiento del servicio
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environments';
import { Observable } from 'rxjs';

//Decorador que define el servicio
@Injectable({
  providedIn: 'root'
})

//Exportacion del servicio
export class CarritoService {

  //Constructor del servicio
  constructor(private http: HttpClient) { }

  //Metodo para obteenr detalles del carrito a traves de un codigo
  getDetallesCarrito(codigo: number){
    console.log(codigo);
    let url = environment.WA_PATH + '/carrito?codigo='+codigo
    console.log(url);
    return this.http.get<any>(url);
  }

  //Metodo para eliminar el detalle a traves de un codigo
  eliminarDetalle(codigo: number): Observable<any>{
    let url = environment.WA_PATH + '/detallesCarrito?codigo=' + codigo;
    console.log(url);
    return this.http.delete<any>(url);
  }

}
