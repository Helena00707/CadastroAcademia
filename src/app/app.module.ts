import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CabecalhoComponent } from './componentes/cabecalho/cabecalho.component';
import { RodapeComponent } from './componentes/rodape/rodape.component';
import { PaginaInicialComponent } from './componentes/pagina-inicial/pagina-inicial.component';
import { VerificarCadastrosComponent } from './componentes/verificar-cadastros/verificar-cadastros.component';
import { InformacoesAcademiaComponent } from './componentes/informacoesacademia/informacoesacademia.component';

@NgModule({
  declarations: [
    AppComponent,
    CabecalhoComponent,
    RodapeComponent,
    PaginaInicialComponent,
    VerificarCadastrosComponent,
    InformacoesAcademiaComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
