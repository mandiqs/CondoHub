import { Component } from '@angular/core';
import { CadastrarMoradorService } from '../../services/cadastrar-morador.service';
import { Morador } from '../../models/morador';

@Component({
  selector: 'app-cadastro-morador',
  templateUrl: './cadastro-morador.component.html',
  styleUrls: ['./cadastro-morador.component.scss'] 
})
export class CadastroMoradorComponent {

  cadastroMorador: Morador = {
    andar: 0,
    dataNascimento: "",
    email: "",
    nome: "",
    numeroApto: 0,
    vagasGaragem: 0,
    status: ""
  };

  constructor(private cadastrarMoradorService: CadastrarMoradorService) {}
  
  onSubmit() {
    this.cadastrarMoradorService.saveData(this.cadastroMorador)
      .then(() => {
        this.resetForm();
      })
      .catch(error => {
        console.error("Error saving data:", error);
      });
  }

  resetForm() {
    this.cadastroMorador = {
      andar: 0,
      dataNascimento: '',
      email: "",
      nome: "",
      numeroApto: 0,
      vagasGaragem: 0,
      status: ""
    };
  }
}


