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
    };
  }

  loadData() {
    this.cadastrarAvisoService.getData().subscribe((data: Aviso[])=>{
      this.cadastroAviso = data;
    });
  }
}
