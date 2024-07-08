import { Component, OnInit } from '@angular/core';
import {TarefaService} from "../../app-core/servicos/cadastro-service.service";
import {Cadastro} from "../../app-core/model/cadastro";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
declare var $ : any;
import Swal from 'sweetalert2';

@Component({
  selector: 'app-verificar-cadastros',
  templateUrl: './verificar-cadastros.component.html',
  styleUrls: ['./verificar-cadastros.component.css']
})
export class VerificarCadastrosComponent implements OnInit {

  i: number =0;
  cadastros: any [] =[];
  cadastroVisualizar: any;
  form: FormGroup;
  constructor(private cadastroService: TarefaService,
              private fb: FormBuilder) {

    this.form = this.fb.group({
      tituloTarefa: ['', Validators.required],
      dataInicioTarefa: ['', Validators.required],
      dataConclusaoTarefa: ['', Validators.required],
      statusTarefa: ['', Validators.required],
      descricaoTarefa: ['', Validators.required],
      id: [0],
      imagem: ['']
    });
  }

  openModal(){
    $('#add-tarefa').modal('show');
  }
  closeModal(){
    $('#add-tarefa').modal('hide');
  }
  salvarFormTarefa() {
    if(this.form.valid){
      const novaTarefa: Cadastro = new Cadastro(
        this.form.value.tituloTarefa,
        this.form.value.dataInicioTarefa,
        this.form.value.dataConclusaoTarefa,
        this.form.value.descricaoTarefa,
        this.form.value.statusTarefa,
        undefined,
        this.form.value.imagem
      );
      console.log('dados da nova tarefa: ',novaTarefa);
      this.cadastroService.adicionarTarefa(novaTarefa).then(resposta => {
        if(resposta > 0){
          Swal.fire('Sucesso', 'Tarefa salva com sucesso!', 'success');
          this.form.reset();
          this.closeModal();
          this.listarTarefas();
        }
      }).catch(respostaError => {
        Swal.fire('Não foi dessa vez', 'Não foi possível salvar a tarefa, ' +
          'tente novamente mais tarde', 'error');
        console.log(respostaError);
      })
    }else{
      console.log("CAMPOS INVALIDOS");
      console.log("DADOS: ", this.form.value);
      Swal.fire('Cuidado', 'Verificar campos ' +
        'novamente.', 'warning');
      this.marcarTodosComoClicados();
    }
  }
  isCampoValido(inputNome: string) : boolean {
    const campo: any = this.form.get(inputNome);
    return campo && campo.touched && campo.invalid;
  }
  marcarTodosComoClicados(){
    Object.values(this.form.controls).forEach(campo => {
      campo.markAsTouched();
    });
  }
  listarTarefas(){
    this.cadastroService.buscartarefas().then(resposta => {
      this.cadastros= resposta;
    });
  }

  setTarefaAtual(tarefa: Cadastro){
    this.cadastroVisualizar= tarefa;
  }

  excluirTarefa(id: number){
    Swal.fire(
      {
        title: 'Tem certeza?',
        text: 'Você não poderá reverter isso!',
        icon: 'warning',
        showCancelButton: true,
        cancelButtonColor: '#d33',
        confirmButtonText: 'Sim, deletar tarefa!',
        confirmButtonColor: '#3085d6'
      }).then((tipoBotao) => {
      if(tipoBotao.isConfirmed){
        this.cadastroService.removerTarefa(id).then(() => {
          Swal.fire('Deletado!', 'A tarefa foi deletada.', 'success');
          this.listarTarefas();
        });
      }
    }).catch(error => {
      console.log(error);
      Swal.fire('ERRO!', 'A tarefa não foi deletada.', 'error')
    });
  }

  submitForm(){
    if(this.form.value.id > 0){
      this.editarFormTarefa();
    }else{
      this.salvarFormTarefa();
    }
  }
  carregarDadosTarefa(tarefaEditar: Cadastro){
    this.form.patchValue({
      tituloTarefa: tarefaEditar.titulo,
      dataInicioTarefa: tarefaEditar.dataInicio,
      dataConclusaoTarefa: tarefaEditar.dataConclusao,
      statusTarefa: tarefaEditar.status,
      descricaoTarefa: tarefaEditar.descricao,
      id: tarefaEditar.id,
      imagem: tarefaEditar.imagem
    });
    this.openModal();
  }

  editarFormTarefa(){
    if(this.form.valid){
      const editarTarefa: Cadastro = new Cadastro(
        this.form.value.tituloTarefa,
        this.form.value.dataInicioTarefa,
        this.form.value.dataConclusaoTarefa,
        this.form.value.descricaoTarefa,
        this.form.value.statusTarefa,
        this.form.value.id,
        this.form.value.imagem
      );
      this.cadastroService.atualizarTarefa(this.form.value.id, editarTarefa)
        .then(reposta => {
          if(reposta === 1){
            Swal.fire('Sucesso!','Tarefa editada com sucesso.','success');
            this.form.reset();
            this.closeModal();
            this.listarTarefas();
          }else{
            Swal.fire('Atenção','Nenhuma tarefa encontrada, ou nenhuma alteração' +
              ' necessária', 'info');
          }
        }).catch(error => {
        Swal.fire('Cuidado!', 'Não foi possível editar a tarefa.', 'error');
      });
    }else{
      Swal.fire('Cuidado!', 'Alguns campos estão incorretos', 'warning');
      this.marcarTodosComoClicados();
    }
  }

  onFileChange(event: any){
    const file = event.target.files[0];
    if(file){
      const reader = new FileReader();
      reader.onload = (loadEvent) => {
        this.form.patchValue({imagem: loadEvent?.target?.result});
      };
      reader.readAsDataURL(file);
    }
  }

  ngOnInit(): void {
    this.listarTarefas();
  }

}
