//Tercera parte crear un servicio
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../environments/environments';
import { Cliente } from '../domain/cliente';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  constructor(private http: HttpClient) { }//Cuarta parte

  getClientes(){
    let url = environment.WA_PATH+ '/clientes/list';
    console.log(url);
    return this.http.get<any>(url);
  }

  saveCliente(cliente: Cliente){
    let url = environment.WA_PATH + '/clientes';
    return this.http.post<any>(url, cliente);
  }

  updateCliente(cliente: Cliente){
    let url = environment.WA_PATH + '/clientes'
    return this.http.put<any>(url, cliente);
  }

  deleteCliente(cliente: number): Observable<any>{
    let url = environment.WA_PATH + '/clientes?id=' + cliente;
    console.log(url);
    return this.http.delete<any>(url);
  }

}
