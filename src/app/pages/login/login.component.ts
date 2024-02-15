import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Usuario } from 'src/app/domain/cliente';
import { CarritoService } from 'src/app/services/services-carrito/carrito.service';
import { CuentaService } from 'src/app/services/services-cuenta/cuenta.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit {

  ocurrioUnError: boolean = false;
  loginForm: FormGroup;
  usuarioLogueado: any;
  codigoUsuarioLogueado: any;
  mostrarFormulario: boolean = true;
  mostrarinfo: boolean = false;
  infoUser: any;
  carrito: any;

  constructor(private cuentaService: CuentaService,
    private fb: FormBuilder,
    private router: Router) {
    window.scrollTo({
      top: 0
    })

    this.loginForm = this.fb.group({
      correo: ['', [Validators.required, Validators.email]],
      contrasenia: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.ocurrioUnError = false;
    this.cuentaService.obtenerUsuarioLogueado().subscribe(usuario => {
      this.usuarioLogueado = usuario;
      console.log(this.infoUser);
      if (this.usuarioLogueado = usuario) {
        this.mostrarFormulario = true;
        this.mostrarinfo = true;
      }
    }, error => {
      console.error("No se pudo obtener el usuario logueado", error);
    });
  }

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
    this.ngOnInit();
  }

  registrarse() {
    this.router.navigate([('/pages/register')])
  };

}
