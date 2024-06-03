import { Component } from '@angular/core';
import { CadastrarAvisoService } from '../../cadastrar-aviso.service';
import { Aviso } from '../../models/aviso';

@Component({
  selector: 'app-cadastro-avisos',
  templateUrl: './cadastro-avisos.component.html',
  styleUrls: ['./cadastro-avisos.component.scss']
})
export class CadastroAvisosComponent {

  cadastroAvisos: Aviso = {
    titulo: "",
    data: "",
    mensagem: "",
  };

  constructor(private cadastrarAvisoService: CadastrarAvisoService) {}
  
  onSubmit() {
    this.cadastrarAvisoService.saveData(this.cadastroAvisos)
      .then(() => {
        this.resetForm();
      })
      .catch(error => {
        console.error("Error saving data:", error);
      });
  }

  resetForm() {
    this.cadastroAvisos = {
      titulo: "",
      data: "",
      mensagem: "",
    };
  }
}
