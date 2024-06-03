import { Component } from '@angular/core';
import { CadastrarPorteiroService } from '../../cadastrar-porteiro.service';
import { Porteiro } from '../../models/porteiro';

@Component({
  selector: 'app-cadastro-porteiros',
  templateUrl: './cadastro-porteiros.component.html',
  styleUrls: ['./cadastro-porteiros.component.scss']
})
export class CadastroPorteirosComponent {

  cadastroPorteiros: Porteiro = {
    nome: "",
    turno: "",
    cpf: "",
    dataNascimento: "",
    endereco: "",
    telefone: "",
    dataContratacao: "",
  };

  constructor(private cadastrarPorteiroService: CadastrarPorteiroService) {}
  
  onSubmit() {
    this.cadastrarPorteiroService.saveData(this.cadastroPorteiros)
      .then(() => {
        this.resetForm();
      })
      .catch(error => {
        console.error("Error saving data:", error);
      });
  }

  resetForm() {
    this.cadastroPorteiros = {
      nome: "",
      turno: "",
      cpf: "",
      dataNascimento: "",
      endereco: "",
      telefone: "",
      dataContratacao: "",
    };
  }
}