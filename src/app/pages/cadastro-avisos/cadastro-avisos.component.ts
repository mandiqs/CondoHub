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
    titulo: "",
    data: "",
    mensagem: "",
    id: "",
  };

  constructor(private cadastrarAvisoService: CadastrarAvisoService) {}
  
  ngOnInit() {
    this.cadastrarAvisoService.getData().subscribe((data: Aviso[]) => {
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
    this.cadastrarAvisoService.getData().subscribe((data: Aviso[]) => {
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

  onEdit(aviso: Aviso) {
    this.avisoEmEdicao = { ...aviso };
  }

  onSave(aviso: Aviso) {
    if (aviso.id) {
      this.cadastrarAvisoService.updateData(aviso)
        .then(() => {
          this.loadData(); // Recarregar os dados após atualizar
          console.log("Aviso atualizado com sucesso");
          this.avisoEmEdicao = undefined;
        })
        .catch(error => {
          console.error('Erro ao atualizar o aviso:', error);
        });
    }
  }

  onCancel() {
    this.avisoEmEdicao = undefined;
  }
}

