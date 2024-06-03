import { Component } from '@angular/core';
import { Timestamp } from 'firebase/firestore';
import { GerenciarMoradorService } from '../../services/gerenciar-morador.service';

@Component({
  selector: 'app-gerenciar-morador',
  templateUrl: './gerenciar-morador.component.html',
  styleUrl: './gerenciar-morador.component.scss'
})
export class GerenciarMoradorComponent {

}

export interface GerenciarMoradorComponent {
  andar: number;
  dataNascimento: Timestamp; 
  email: string;
  nome: string;
  numeroApto: number;
  status: string;
}