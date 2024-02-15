import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Credenciales, User } from 'src/app/domain/cliente';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-cuenta',
  templateUrl: './cuenta.component.html',
  styleUrls: ['./cuenta.component.scss']
})
export class CuentaComponent{
  
  users: any
  us: User = new User();

  credenciales: Credenciales = new Credenciales();

  isLoggedIn: boolean = false;

  nombreUsuario: string = '';;

  usuarioLogeado: User | null = null;
  

  constructor(private usuarioService: UsuarioService, private router: Router){
    window.scrollTo({
      top: 0
    })
  }

  
  mostrarFormularioEstatico: boolean = true;
  mostrarFormulario: boolean = false;

  
  ngOnInit(): void {
    this.usuarioLogeado = this.usuarioService.getUsuarioLogeado();
    if (this.usuarioLogeado) {
      // Si hay un usuario logeado, ocultamos el formulario de registro
      this.mostrarFormularioEstatico = false;
    }
    this.users = this.usuarioService.getClientes();
    
}

  login(){
    this.mostrarFormularioEstatico = false;
    this.mostrarFormulario = true;
  }

  guardar() {
    // Validación de campos vacíos
    if (!this.us.nombre || !this.us.apellido || !this.us.correo || !this.us.password) {
      alert('Por favor complete todos los campos.');
      return;
    }
  
    // Validación de correo electrónico
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(this.us.correo)) {
      alert('Por favor ingrese un correo electrónico válido.');
      return;
    }
  
    // Validación de contraseñas
    if (this.us.password !== this.us.confirmPassword) {
      alert('Las contraseñas no coinciden.');
      return;
    }
  
    // Validación de cédula
    if (!this.us.cedula || !this.validarCedula(this.us.cedula)) {
      alert('Por favor ingrese una cédula válida.');
      return;
    }
  
    // Envío del formulario si la validación es exitosa
    this.usuarioService.saveUsuario(this.us).subscribe(
      data => {
        console.log(data);
        if (data.codigo !== 0) {
          this.ngOnInit();
          alert('El usuario se ha registrado correctamente.');
          this.usuarioService.actualizarNombreUsuario(data.nombre, data.apellido);
          this.router.navigateByUrl('pages/inicio');
        } else {
          alert('Error al insertar: ' + data.mensaje);
        }
      },
      error => {
        console.error('Error al guardar el usuario:', error);
        alert('Error al guardar el usuario: ' + error.message);
      }
    );
  }
  
  validarCedula(cedula: string): boolean {
    // Verificar que la cédula tenga 10 dígitos
    if (cedula.length !== 10) {
      return false;
    }
  
    // Obtener el último dígito (dígito verificador)
    const digitoVerificador = parseInt(cedula.charAt(9));
  
    // Obtener los primeros 9 dígitos
    const digitos = cedula.substring(0, 9).split('').map(Number);
  
    // Aplicar algoritmo de validación de cédula ecuatoriana
    const total = digitos.reduce((acc, curr, index) => {
      if (index % 2 === 0) {
        let double = curr * 2;
        if (double > 9) {
          double -= 9;
        }
        return acc + double;
      } else {
        return acc + curr;
      }
    }, 0);
  
    const modulo = total % 10;
    const decenaSuperior = total + (10 - modulo);
    const digitoCalculado = decenaSuperior - total;
  
    return digitoCalculado === digitoVerificador;
  }

  iniciarSesion() {

    if (!this.credenciales.correo || !this.credenciales.password) {
      alert('Por favor, complete todos los campos.');
      return;
    }

    // Verificar si el correo tiene un formato válido
    const correoRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!correoRegex.test(this.credenciales.correo)) {
      alert('Por favor, ingrese un correo electrónico válido.');
      return;
    }
    
  
    this.usuarioService.iniciarSesion(this.credenciales).subscribe(
      data => {
        console.log(data);
        if (data.nombre !== undefined && data.apellido !== undefined) {
          this.usuarioService.actualizarNombreUsuario(data.nombre, data.apellido);
        }
        // Redirige a la nueva página
        this.router.navigate(['/pages/inicio']);
      },
      error => {
        console.error('Otro tipo de error:', error);
        // Maneja el error apropiadamente
        alert('Correo o contraseña incorrectos.'+error); 
      }
    );
    
  }



}


