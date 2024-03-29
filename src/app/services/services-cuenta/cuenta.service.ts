//Importacion de las librerias necesarias para el funcionamiento del servicio
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, of, tap } from 'rxjs';
import { Credenciales, Usuario } from 'src/app/domain/cliente';
import { environment } from 'src/app/environments/environments';

//Decorador que define el servicio
@Injectable({
  providedIn: 'root'
})

// Exportacion de la clase
export class CuentaService {

  //Constructor del servicio
  constructor(private http: HttpClient) { }

  //Metodo para obtener los usuarios            
  getUsuarios(){
    let url = environment.WA_PATH + '/usuarios/list';
    return this.http.get<any>(url);
  }

  //Metodo para guardar los usuarios
  saveUsuarios(usuario: Usuario){
    let url = environment.WA_PATH + '/usuarios';
    return this.http.post<any>(url, usuario);
  }

  //Metodo que permite cambiar el estado del usuario al loguearse
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

  //Metodo que permite obtener el usuario logueado
  obtenerUsuarioLogueado(): Observable<Usuario> {
    let url = environment.WA_PATH + '/usuarios/usuario-logueado';
    return this.http.get<Usuario>(url);
  }

  //Metodo que cierra sesion del usuario
  obtenerUsuarioLogOut(): Observable<Usuario> {
    let url = environment.WA_PATH + '/usuarios/usuario-logout';
    return this.http.get<Usuario>(url);
  }

  //Metodo para obtener por id al usuario
  getUsuarioById(codigo: any){
    let url = environment.WA_PATH + '/usuarios?codigo=' + codigo;
    return this.http.get<any>(url, codigo);
  }

  //Declaracion de variables
  isLoggedIn: boolean = false;
  usuarioLogeado: Usuario | null = null;

  nombreUsuario: string = "";

  //Actualizamos el nombre de usuario
  actualizarNombreUsuario(nombre: string, apellido: string) {
    this.nombreUsuario = nombre+ ' ' + apellido;
  }

  //Creamos la factura
  crearFactura(codigo: number){
    let url = environment.WA_PATH + '/carrito/limpiar-carrito'
    return this.http.post<any>(url, codigo);
  }

}
