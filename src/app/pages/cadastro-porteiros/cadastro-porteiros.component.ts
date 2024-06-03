import { Component, OnInit } from '@angular/core';
import { CadastrarPorteiroService } from '../../cadastrar-porteiro.service';
import { Porteiro } from '../../models/porteiro';

@Component({
  selector: 'app-cadastro-porteiros',
  templateUrl: './cadastro-porteiros.component.html',
  styleUrls: ['./cadastro-porteiros.component.scss']
})
export class CadastroPorteirosComponent implements OnInit {

  cadastroPorteiro: Porteiro[] = [];
  porteiroEmEdicao?: Porteiro;

  cadastroPorteiros: Porteiro = {
    nome: "",
    turno: "",
    cpf: "",
    dataNascimento: "",
    endereco: "",
    telefone: "",
    dataContratacao: "",
    id: "",
  };

  constructor(private cadastrarPorteiroService: CadastrarPorteiroService) {}
  
  ngOnInit() {
    this.cadastrarPorteiroService.getData().subscribe((data: Porteiro[])=>{
      this.cadastroPorteiro = data;
    });
  }
  
  onSubmit() {
    this.cadastrarPorteiroService.saveData(this.cadastroPorteiros)
      .then(() => {
        this.resetForm();
        this.loadData(); // Recarregar os dados após salvar
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
      id: "",
    };
  }

  loadData() {
    this.cadastrarPorteiroService.getData().subscribe((data: Porteiro[])=>{
      this.cadastroPorteiro = data;
    });
  }

  onDelete(cadastroPorteiros: Porteiro) {
    const cadastroPorteirosId = cadastroPorteiros.id;
    if (cadastroPorteirosId) {
      this.cadastrarPorteiroService.deleteData(cadastroPorteirosId)
        .then(() => {
          this.cadastroPorteiro = this.cadastroPorteiro.filter(item => item.id !== cadastroPorteirosId);
          console.log("Deletado com sucesso");
        })
        .catch(error => {
          console.error('Erro ao deletar:', error);
        });
    } else {
      console.log("Não encontrado");
    } 
  }

  onEdit(porteiro: Porteiro) {
    this.porteiroEmEdicao = { ...porteiro };
  }

  onSave(porteiro: Porteiro) {
    if (porteiro.id) {
      this.cadastrarPorteiroService.updateData(porteiro)
        .then(() => {
          this.loadData(); // Recarregar os dados após atualizar
          console.log("Porteiro atualizado com sucesso");
          this.porteiroEmEdicao = undefined;
        })
        .catch(error => {
          console.error('Erro ao atualizar porteiro:', error);
        });
    }
  }

  onCancel() {
    this.porteiroEmEdicao = undefined;
  }
}

