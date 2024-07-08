import { Injectable } from '@angular/core';
import { Cadastro } from "../model/cadastro";
import Dexie from "dexie";

@Injectable({
  providedIn: 'root'
})
export class TarefaService extends Dexie {
  tarefas: Dexie.Table<Cadastro, number>;


  constructor() {
    super('TarefaDB');

    // Define a estrutura do banco de dados
    this.version(1).stores({
      tarefas: '++id, titulo, dataInicio, dataConclusao, status, descricao, imagem'
    });

    // Obtém a tabela 'tarefas' para interação
    this.tarefas = this.table('tarefas');
  }

  // Adiciona uma nova tarefa ao banco de dados
  async adicionarTarefa(tarefa: Cadastro): Promise<number> {
    return await this.tarefas.add(tarefa);
  }

  // Busca todas as tarefas no banco de dados
  async buscartarefas(): Promise<Cadastro[]> {
    return await this.tarefas.toArray();
  }

  // Remove uma tarefa do banco de dados pelo ID
  async removerTarefa(id: number): Promise<void> {
    return await this.tarefas.delete(id);
  }

  // Atualiza uma tarefa no banco de dados pelo ID
  async atualizarTarefa(id: number, tarefa: Cadastro): Promise<number> {
    return await this.tarefas.update(id, tarefa);
  }
}
