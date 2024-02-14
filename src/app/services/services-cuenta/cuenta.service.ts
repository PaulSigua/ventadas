import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, of, tap } from 'rxjs';
import { Credenciales, Usuario } from 'src/app/domain/cliente';
import { environment } from 'src/app/environments/environments';

@Injectable({
  providedIn: 'root'
})
export class CuentaService {

  constructor(private http: HttpClient) { }

  getUsuarios(){
    let url = environment.WA_PATH + '/usuarios/list';
    return this.http.get<any>(url);
  }

  saveUsuarios(usuario: Usuario){
    let url = environment.WA_PATH + '/usuarios';
    return this.http.post<any>(url, usuario);
  }

  cambiarEstado(credenciales: Credenciales): Observable<any> {
    let url = environment.WA_PATH + '/usuarios/validar-login';
    return this.http.post<any>(url, credenciales).pipe(
      tap((res) => console.log(res)), // Maneja la respuesta exitosa
      catchError((error) => {
        console.error('Error en el login', error);
        return of(error); // Maneja el error y continúa el flujo
      })
    );
  }

  obtenerUsuarioLogueado(): Observable<Usuario> {
    let url = environment.WA_PATH + '/usuarios/usuario-logueado';
    return this.http.get<Usuario>(url);
  }

  getUsuarioById(codigo: any){
    let url = environment.WA_PATH + '/usuarios?codigo=' + codigo;
    return this.http.get<any>(url, codigo);
  }

  isLoggedIn: boolean = false;
  usuarioLogeado: Usuario | null = null;

  nombreUsuario: string = "";

  actualizarNombreUsuario(nombre: string, apellido: string) {
    this.nombreUsuario = nombre+ ' ' + apellido;
  }

  getUsuarioLogeado(): Usuario | null {
    return this.usuarioLogeado;
  }

}
