import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-informacoesacademia',
  templateUrl: './informacoesacademia.component.html',
  styleUrls: ['./informacoesacademia.component.css']
})
export class InformacoesAcademiaComponent implements OnInit {

  // Horários de funcionamento da academia
  horariosFuncionamento = {
    segunda: '08:00 - 22:00',
    terca: '08:00 - 22:00',
    quarta: '08:00 - 22:00',
    quinta: '08:00 - 22:00',
    sexta: '08:00 - 20:00',
    sabado: '09:00 - 14:00',
    domingo: 'Fechado'
  };

  // Endereço da academia
  endereco = 'Rua das Corujas, 123 - Bairro Corujão - Cidade das Corujas';

  // Serviços oferecidos pela academia
  servicosOferecidos = [
    'Musculação',
    'Aulas de Grupo',
    'Personal Trainer',
    'Nutrição Esportiva'
  ];

  // Informações de contato da academia
  contato = {
    telefone: '(55) 3222-5678',
    email: 'contato@academia.com',
    site: 'www.academia.com'
  };

  constructor() { }

  ngOnInit(): void {
    // Inicialização do componente
  }
}
