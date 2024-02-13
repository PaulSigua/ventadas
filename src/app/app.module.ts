import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
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
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import {MatSidenavModule} from '@angular/material/sidenav';
import {MatListModule} from '@angular/material/list';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { MatIconModule } from '@angular/material/icon';

import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { MatInputModule } from '@angular/material/input';
import { ValidarDatosPersonalesComponent } from './pages/validar-datos-personales/validar-datos-personales.component';
import { FormaPagoComponent } from './pages/forma-pago/forma-pago.component';
import { ProductoDetallesComponent } from './pages/producto-detalles/producto-detalles.component';
import { LoginComponent } from './pages/login/login.component';
import { RegistrarseComponent } from './pages/registrarse/registrarse.component';

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
    ValidarDatosPersonalesComponent,
    FormaPagoComponent,
    ProductoDetallesComponent,
    LoginComponent,
    RegistrarseComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    MatSidenavModule,
    MatListModule,
    MatIconModule,
    MatButtonModule,
    MatMenuModule,
    MatInputModule,
    BrowserAnimationsModule,
    AppRoutingModule //Para la conexion con Eclipse primero importamos esto
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [
    provideAnimationsAsync()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
