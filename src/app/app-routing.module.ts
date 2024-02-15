// Importaciones de librerias necesarias para el funcionamiento del modulo
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InicioComponent } from './pages/inicio/inicio.component';
import { ProductosComponent } from './pages/productos/productos.component';
import { NosotrosComponent } from './pages/nosotros/nosotros.component';
import { ContactanosComponent } from './pages/contactanos/contactanos.component';
import { CarritoComponent } from './pages/carrito/carrito.component';
import { ValidarDatosPersonalesComponent } from './pages/validar-datos-personales/validar-datos-personales.component';
import { FormaPagoComponent } from './pages/forma-pago/forma-pago.component';
import { ProductoDetallesComponent } from './pages/producto-detalles/producto-detalles.component';
import { LoginComponent } from './pages/login/login.component';
import { RegistrarseComponent } from './pages/registrarse/registrarse.component';
import { AgradecimientoComponent } from './pages/agradecimiento/agradecimiento.component';

// Constante que donde se almacenan las rutas que redirigen hacia los componentes del angular
const routes: Routes = [
  {path: '', redirectTo: 'pages/inicio', pathMatch: 'full'},
  {path: 'pages/inicio', component: InicioComponent},
  {path: 'pages/productos', component: ProductosComponent},
  {path: 'pages/nosotros', component: NosotrosComponent},
  {path: 'pages/contactanos', component: ContactanosComponent},
  {path: 'pages/carrito', component: CarritoComponent},
  {path: 'pages/cuenta', component: LoginComponent},
  {path: 'pages/register', component: RegistrarseComponent},
  {path: 'pages/datos-personales', component: ValidarDatosPersonalesComponent},
  {path: 'pages/forma-pago', component: FormaPagoComponent},
  {path: 'pages/producto/:id', component: ProductoDetallesComponent},
  {path: 'pages/agradecimiento', component: AgradecimientoComponent}
];

//Decorador que define al modulo
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

// Exportacion de la clase
export class AppRoutingModule { }
