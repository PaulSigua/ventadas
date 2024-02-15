// Importaciones de librerias necesarias para el funcionamiento del componente
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CarritoService } from 'src/app/services/services-carrito/carrito.service';
import { CuentaService } from 'src/app/services/services-cuenta/cuenta.service';

//Decorador que define el componente
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
// Exportacion de la clase
export class LoginComponent implements OnInit {

// Declaracion de variables
  ocurrioUnError: boolean = false;
  loginForm: FormGroup;
  usuarioLogueado: any;
  codigoUsuarioLogueado: any;
  mostrarFormulario: boolean = true;
  mostrarinfo: boolean = false;
  infoUser: any;
  carrito: any;

  //Metodo constructor del componente
  constructor(private cuentaService: CuentaService,
    private fb: FormBuilder,
    private router: Router) {
    window.scrollTo({
      top: 0
    })

    // Validacion de los datos para iniciar sesion
    this.loginForm = this.fb.group({
      correo: ['', [Validators.required, Validators.email]],
      contrasenia: ['', Validators.required]
    });
  }

  // Metodo de ciclo de vida del componente
  ngOnInit(): void {
    // Ponemos los metodos que queremos ejecutar al iniciar el componente
    this.ocurrioUnError = false;
    this.cuentaService.obtenerUsuarioLogueado().subscribe(usuario => {
      this.usuarioLogueado = usuario;
      console.log(this.infoUser);
      if (this.usuarioLogueado = usuario) {
        this.mostrarFormulario = false;
        this.mostrarinfo = true;
      }
    }, error => {
      console.error("No se pudo obtener el usuario logueado", error);
    });
  }

  //Metodo para iniciar sesion
  login() {
    if (this.loginForm.valid) {
      this.cuentaService.cambiarEstado(this.loginForm.value).subscribe(data => {
        console.log(data.codigo)
        this.usuarioLogueado = data;
        this.router.navigate([('/pages/inicio')])
        this.ocurrioUnError = false;
        console.log('login exitoso' + data);
      }
      )
    }
  }

  //Metodo para navegar a la pagina Registrarse
  registrarse() {
    this.router.navigate([('/pages/register')])
  };

  //Metodo para cerrar sesion del usuario
  cerrarSesion(){
    this.cuentaService.obtenerUsuarioLogOut().subscribe (
      data => {
        console.log(data);
      }
    )
    window.location.reload();
  }
}
