import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {PaginaInicialComponent} from "./componentes/pagina-inicial/pagina-inicial.component";
import {VerificarCadastrosComponent} from "./componentes/verificar-cadastros/verificar-cadastros.component";
import { InformacoesAcademiaComponent } from './componentes/informacoesacademia/informacoesacademia.component';

const routes: Routes = [
  { path: "", redirectTo: "pagina-inicial", pathMatch: "full" },
  { path: "pagina-inicial", component: PaginaInicialComponent },
  { path: "visualizar-tarefas", component: VerificarCadastrosComponent},
  { path: 'informacoes-academia', component: InformacoesAcademiaComponent }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
