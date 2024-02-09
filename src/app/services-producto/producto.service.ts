import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../environments/environments';

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
}
