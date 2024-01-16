import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InicioComponent } from './pages/inicio/inicio.component';
import { ProductosComponent } from './pages/productos/productos.component';
import { NosotrosComponent } from './pages/nosotros/nosotros.component';
import { ContactanosComponent } from './pages/contactanos/contactanos.component';
import { CarritoComponent } from './pages/carrito/carrito.component';
import { CuentaComponent } from './pages/cuenta/cuenta.component';
import { ClientesComponent } from './pages/clientes/clientes.component';

const routes: Routes = [
  {path: '', redirectTo: 'pages/inicio', pathMatch: 'full'},
  {path: 'pages/inicio', component: InicioComponent},
  {path: 'pages/productos', component: ProductosComponent},
  {path: 'pages/nosotros', component: NosotrosComponent},
  {path: 'pages/contactanos', component: ContactanosComponent},
  {path: 'pages/carrito', component: CarritoComponent},
  {path: 'pages/login', component: CuentaComponent},
  {path: 'pages/clientes', component: ClientesComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
