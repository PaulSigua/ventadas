import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, map } from 'rxjs';
import { Credenciales, Cuenta } from 'src/app/domain/cliente';
import { environment } from 'src/app/environments/environments';

@Injectable({
  providedIn: 'root'
})
export class CuentaService {

  constructor(private http: HttpClient) { }

  getCuentas(){
    let url = environment.WA_PATH + '/cuenta/list';
    return this.http.get<any>(url);
  }

  saveCuentas(cuenta: Cuenta){
    let url = environment.WA_PATH + '/cuenta';
    return this.http.post<any>(url, cuenta);
  }

  login(credenciales: Credenciales): Observable<any> {
    let url = environment.WA_PATH + '/cuenta/validar-login';
    return this.http.post<any>(url, credenciales)
  }
}
