import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CuentaService } from 'src/app/services/services-cuenta/cuenta.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit{

  ocurrioUnError: boolean = false;
  loginForm: FormGroup;

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
  }

  login() {
    if (this.loginForm.valid) {
      this.cuentaService.login(this.loginForm.value).subscribe(data => {
        this.router.navigate([('/pages/cuenta-personal')]);
        this.ocurrioUnError = false;
        console.log('login exitoso' + data);
      }
      )
    }
    this.ngOnInit();
  }

  registrarse() {
    this.router.navigate([('/pages/register')])
  }

}
