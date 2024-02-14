import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environments';
import { CargarProducto, Producto } from '../../domain/cliente';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductoService {

  constructor(private http: HttpClient) { }

  getProductos(){
    let url = environment.WA_PATH + '/productos/list'
    return this.http.get<any>(url);
  }

  getCategoriaRopa(){
    let url = environment.WA_PATH + '/productos/categoria?codigo=1';
    return this.http.get<any>(url);
  }

  getCategoriaTecnologia(){
    let url = environment.WA_PATH + '/productos/categoria?codigo=2';
    return this.http.get<any>(url);
  }

  getCategoriaHogar(){
    let url = environment.WA_PATH + '/productos/categoria?codigo=3';
    return this.http.get<any>(url);
  }

  getCategoriaGaming(){
    let url = environment.WA_PATH + '/productos/categoria?codigo=4';
    return this.http.get<any>(url);
  }

  getCategoriaElectrodomesticos(){
    let url = environment.WA_PATH + '/productos/categoria?codigo=5';
    return this.http.get<any>(url);
  }

  getCategoriaConstruccion(){
    let url = environment.WA_PATH + '/productos/categoria?codigo=6';
    return this.http.get<any>(url);
  }

  getCodigoCarrito(){
    let url = environment.WA_PATH + '/carrito/list';
    return this.http.get<any>(url);
  }

  getProductoById(id: number): Observable<Producto[]> {
    let url = environment.WA_PATH + '/productos/id?codigo=' + id;
    return this.http.get<Producto[]>(url);
  }

  cargarProducto(cargar: CargarProducto){
    let url = environment.WA_PATH + '/productos/addProducto';
    return this.http.post<any>(url, cargar);
  }

  buscarProductos(nombre: string): Observable<Producto[]> {
    let url = environment.WA_PATH + '/productos/buscar?nombre=' + nombre;
    return this.http.get<Producto[]>(url);
  }
}
