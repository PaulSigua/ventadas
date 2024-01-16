import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MenuComponent } from './pages/menu/menu.component';
import { InicioComponent } from './pages/inicio/inicio.component';
import { ProductosComponent } from './pages/productos/productos.component';
import { NosotrosComponent } from './pages/nosotros/nosotros.component';
import { ContactanosComponent } from './pages/contactanos/contactanos.component';
import { CarritoComponent } from './pages/carrito/carrito.component';
import { CuentaComponent } from './pages/cuenta/cuenta.component';
import { FooterComponent } from './pages/footer/footer.component';
import { HttpClientModule } from '@angular/common/http';
import { ClientesComponent } from './pages/clientes/clientes.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    InicioComponent,
    ProductosComponent,
    NosotrosComponent,
    ContactanosComponent,
    CarritoComponent,
    CuentaComponent,
    FooterComponent,
    ClientesComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule //Para la conexion con Eclipse primero importamos esto
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
