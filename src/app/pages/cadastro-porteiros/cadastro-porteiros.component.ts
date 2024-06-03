import { Component , OnInit} from '@angular/core';
import { CadastrarPorteiroService } from '../../cadastrar-porteiro.service';
import { Porteiro } from '../../models/porteiro';

@Component({
  selector: 'app-cadastro-porteiros',
  templateUrl: './cadastro-porteiros.component.html',
  styleUrls: ['./cadastro-porteiros.component.scss']
})
export class CadastroPorteirosComponent implements OnInit {

  cadastroPorteiro: Porteiro[] = [];
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
    };
  }

  loadData() {
    this.cadastrarPorteiroService.getData().subscribe((data: Porteiro[])=>{
      this.cadastroPorteiro = data;
    });
  }


}