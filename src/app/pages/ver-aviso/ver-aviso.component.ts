import { Component, OnInit } from '@angular/core';
import { Firestore, collection, collectionData, query, where } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { combineLatest } from 'rxjs';
import { map } from 'rxjs/operators';
import { Aviso } from '../../models/aviso';

@Component({
  selector: 'app-ver-aviso',
  templateUrl: './ver-aviso.component.html',
  styleUrls: ['./ver-aviso.component.scss']
})
export class VerAvisoComponent implements OnInit {
  avisos$: Observable<Aviso[]> | undefined;

  constructor(private firestore: Firestore) {}

  ngOnInit(): void {
    const moradorId = sessionStorage.getItem('moradorId');
    this.loadAvisos(moradorId);
  }

  loadAvisos(moradorId: string | null): void {
    const avisosCollectionRef = collection(this.firestore, 'avisos');
    const avisosGeraisQuery = query(avisosCollectionRef, where('tipo', '==', 'geral'));
    const avisosEspecificosQuery = query(avisosCollectionRef, where('moradorid', '==', moradorId));

    const avisosGerais$ = collectionData(avisosGeraisQuery, { idField: 'id' }) as Observable<Aviso[]>;
    const avisosEspecificos$ = collectionData(avisosEspecificosQuery, { idField: 'id' }) as Observable<Aviso[]>;

    this.avisos$ = combineLatest([avisosGerais$, avisosEspecificos$]).pipe(
      map(([gerais, especificos]) => [...gerais, ...especificos])
    );
  }
}

