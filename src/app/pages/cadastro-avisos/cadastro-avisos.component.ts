import { Component , OnInit} from '@angular/core';
import { CadastrarAvisoService } from '../../cadastrar-aviso.service';
import { Aviso } from '../../models/aviso';

@Component({
  selector: 'app-cadastro-avisos',
  templateUrl: './cadastro-avisos.component.html',
  styleUrls: ['./cadastro-avisos.component.scss']
})
export class CadastroAvisosComponent implements OnInit{
  cadastroAviso: Aviso[] = [];
  cadastroAvisos: Aviso = {
    titulo: "",
    data: "",
    mensagem: "",
    id: "",
  };

  constructor(private cadastrarAvisoService: CadastrarAvisoService) {}
  
  ngOnInit() {
    this.cadastrarAvisoService.getData().subscribe((data: Aviso[])=>{
      this.cadastroAviso = data;
    });
  }

  onSubmit() {
    this.cadastrarAvisoService.saveData(this.cadastroAvisos)
    .then(() => {
      this.resetForm();
      this.loadData(); // Recarregar os dados após salvar
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
      id: "",
    };
  }

  loadData() {
    this.cadastrarAvisoService.getData().subscribe((data: Aviso[])=>{
      this.cadastroAviso = data;
    });
  }

  onDelete(cadastroAvisos: Aviso) {
    const cadastroAvisosId = cadastroAvisos.id;
    if (cadastroAvisosId) {
      this.cadastrarAvisoService.deleteData(cadastroAvisosId)
        .then(() => {
          this.cadastroAviso = this.cadastroAviso.filter(item => item.id !== cadastroAvisosId);
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
