import { Component, OnInit } from '@angular/core';
import { HomeMorador } from '../../../models/home-morador.model';
import { Firestore, collectionData, collection, query, where, doc, getDoc } from '@angular/fire/firestore';
import { Observable, combineLatest } from 'rxjs';
import { map } from 'rxjs/operators';
import { Aviso } from '../../../models/aviso';
import { CadastroAvisosComponent } from '../../cadastro-avisos/cadastro-avisos.component';
import { CadastrarAvisoService } from '../../../cadastrar-aviso.service';

@Component({
  selector: 'app-home-morador',
  templateUrl: './home-morador.component.html',
  styleUrls: ['./home-morador.component.scss']
})
export class HomeMoradorComponent implements OnInit {
  avisos$: Observable<Aviso[]> | undefined;
  morador: HomeMorador = {
    id: '',
    nome: '',
    apartamento: '',
    avisos: []
  };

  userName: null | string = "";

  constructor(private firestore: Firestore) {}

  ngOnInit(): void {
    const moradorId = sessionStorage.getItem('user'); //ID do morador armazenado na sessão
    this.userName = sessionStorage.getItem('user');
    if (moradorId) {
      this.loadMoradorData(moradorId);
      this.loadAvisos(moradorId);
    }
  }

  loadMoradorData(moradorId: string): void {
    const moradorDocRef = doc(this.firestore, 'users', moradorId);
    console.log(moradorId);
    getDoc(moradorDocRef).then(docSnap => {
      if (docSnap.exists()) {
        this.morador = docSnap.data() as HomeMorador;
      }
    });
  }

  loadAvisos(moradorid: string): void {
    const avisosCollectionRef = collection(this.firestore, 'avisos');
    const avisosGeraisQuery = query(avisosCollectionRef, where('moradorid', '==', 'geral'));
    const avisosEspecificosQuery = query(avisosCollectionRef, where('moradorid', '==', moradorid));

    const avisosGerais$ = collectionData(avisosGeraisQuery, { idField: 'id' }) as Observable<Aviso[]>;
    const avisosEspecificos$ = collectionData(avisosEspecificosQuery, { idField: 'id' }) as Observable<Aviso[]>;

    this.avisos$ = combineLatest([avisosGerais$, avisosEspecificos$]).pipe(
      map(([gerais, especificos]) => [...gerais, ...especificos])
    );
  }
}





