import { Component, OnInit } from '@angular/core';
import { CadastrarMoradorService } from '../../services/cadastrar-morador.service';
import { Morador } from '../../models/morador';

@Component({
  selector: 'app-cadastro-morador',
  templateUrl: './cadastro-morador.component.html',
  styleUrls: ['./cadastro-morador.component.scss'] 
})
export class CadastroMoradorComponent implements OnInit {
  
  cadastroMoradores: Morador[] = [];

  cadastroMorador: Morador = {
    andar: 0,
    dataNascimento: "",
    email: "",
    nome: "",
    numeroApto: 0,
    vagasGaragem: 0,
    status: "",
    id: "",
  };

  constructor(private cadastrarMoradorService: CadastrarMoradorService) {}

  ngOnInit() {
    this.cadastrarMoradorService.getData().subscribe((data: Morador[])=>{
      this.cadastroMoradores = data;
    });
  }
  
  onSubmit() {
    this.cadastrarMoradorService.saveData(this.cadastroMorador)
      .then(() => {
        this.resetForm();
        this.loadData(); // Recarregar os dados após salvar
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
      status: "",
      id: "",
    };
  }

  loadData() {
    this.cadastrarMoradorService.getData().subscribe((data: Morador[])=>{
      this.cadastroMoradores = data;
    });
  }

  onDelete(cadastroMorador: Morador) {
    const cadastroMoradorId = cadastroMorador.id;
    if (cadastroMoradorId) {
      this.cadastrarMoradorService.deleteData(cadastroMoradorId)
        .then(() => {
          this.cadastroMoradores = this.cadastroMoradores.filter(item => item.id !== cadastroMoradorId);
          console.log("Deletado com sucesso");
        })
        .catch(error => {
          console.error('Error deleting data:', error);
        });
    } else {
      console.log("Não encontrado");
    }
  }

}




