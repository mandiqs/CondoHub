import { Component, OnInit } from '@angular/core';
import { CadastrarAvisoService } from '../../cadastrar-aviso.service';
import { Aviso } from '../../models/aviso';

@Component({
  selector: 'app-cadastro-avisos',
  templateUrl: './cadastro-avisos.component.html',
  styleUrls: ['./cadastro-avisos.component.scss']
})
export class CadastroAvisosComponent implements OnInit {
  cadastroAviso: Aviso[] = [];
  avisoEmEdicao?: Aviso;

  cadastroAvisos: Aviso = {
    titulo: '',
    data: '',
    mensagem: '',
    id: '',
    moradorid: '',
    tipo: '',
  };

  constructor(private cadastrarAvisoService: CadastrarAvisoService) {}

  ngOnInit() {
    this.loadData();
  }

  onSubmit() {
    this.cadastrarAvisoService.saveData(this.cadastroAvisos)
      .then(() => {
        this.resetForm();
        this.loadData();
        alert("Aviso salvo com sucesso!");
      })
      .catch(error => {
        console.error("Error saving data:", error);
        alert("Erro ao salvar dados: " + error.message);
      });
  }

  resetForm() {
    this.cadastroAvisos = {
      titulo: '',
      data: '',
      mensagem: '',
      id: '',
      moradorid: '',
      tipo: '',
    };
  }

  loadData() {
    this.cadastrarAvisoService.getData().subscribe(data => {
      this.cadastroAviso = data;
    }, error => {
      console.error('Error loading data:', error);
      alert("Erro ao carregar dados: " + error.message);
    });
  }

  onDelete(aviso: Aviso) {
    if (!aviso.id) {
      console.error("Error: Missing ID for deletion");
      alert("Erro: ID necessário para exclusão");
      return;
    }
    this.cadastrarAvisoService.deleteData(aviso.id)
      .then(() => {
        this.loadData();
        alert("Aviso deletado com sucesso!");
      })
      .catch(error => {
        console.error('Erro ao deletar os dados:', error);
        alert("Erro ao deletar dados: " + error.message);
      });
  }

  onEdit(aviso: Aviso) {
    this.avisoEmEdicao = { ...aviso };
  }

  onSave(aviso: Aviso) {
    if (!aviso.id) {
      console.error("Error: Missing ID for update");
      alert("Erro: ID necessário para atualização");
      return;
    }
    this.cadastrarAvisoService.updateData(aviso)
      .then(() => {
        this.loadData();
        alert("Aviso atualizado com sucesso!");
      })
      .catch(error => {
        console.error('Erro ao atualizar dados:', error);
        alert("Erro ao atualizar dados: " + error.message);
      });
  }

  onCancel() {
    this.avisoEmEdicao = undefined;
  }
}
