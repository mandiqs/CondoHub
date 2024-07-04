import { Component, OnInit } from '@angular/core';
import { Firestore, collection, query, where, collectionData, doc, getDoc } from '@angular/fire/firestore';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { Aviso } from '../../../models/aviso';
import { HomeMorador } from '../../../models/home-morador.model';

@Component({
  selector: 'app-home-morador',
  templateUrl: './home-morador.component.html',
  styleUrls: ['./home-morador.component.scss']
})
export class HomeMoradorComponent implements OnInit {
  avisosGerais$: Observable<Aviso[]> | undefined;
  avisosEspecificos$: Observable<Aviso[]> | undefined;
  morador: HomeMorador = {
    id: '',
    nome: '',
    apartamento: '',
    avisos: []
  };
  userName: string | null = "";

  constructor(private firestore: Firestore) {}

  ngOnInit(): void {
    const moradorId = sessionStorage.getItem('user'); // ID do morador armazenado na sessão
    this.userName = sessionStorage.getItem('user');this.userName = sessionStorage.getItem('user');
    if (moradorId) {
      this.loadMoradorData(moradorId);
      this.loadAvisos(moradorId);
    }
  }

  loadMoradorData(moradorId: string): void {
    const moradorDocRef = doc(this.firestore, 'users', moradorId);
    getDoc(moradorDocRef).then(docSnap => {
      if (docSnap.exists()) {
        this.morador = docSnap.data() as HomeMorador;
        this.userName = this.morador.nome; // Atualizar o nome do usuário para exibição
        console.log("UserName from Firestore:", this.userName); // Depuração
      } else {
        console.error("No such document!");
      }
    }).catch(error => {
      console.error("Failed to fetch morador data:", error);
      // Handle errors here, possibly setting default values or alerts
    });
  }

  loadAvisos(moradorId: string): void {
    const avisosCollectionRef = collection(this.firestore, 'avisos');
    const avisosGeraisQuery = query(avisosCollectionRef, where('moradorid', '==', 'geral'));
    const avisosEspecificosQuery = query(avisosCollectionRef, where('moradorid', '==', moradorId));

    this.avisosGerais$ = collectionData(avisosGeraisQuery, { idField: 'id' }).pipe(
      map((data: any[]) => {
        console.log("General avisos:", data); // Depuração
        return data as Aviso[];
      }),
      catchError(error => {
        console.error("Failed to fetch general avisos:", error);
        return of([]); // Retorna um array vazio em caso de erro
      })
    );

    this.avisosEspecificos$ = collectionData(avisosEspecificosQuery, { idField: 'id' }).pipe(
      map((data: any[]) => {
        console.log("Specific avisos:", data); // Depuração
        return data as Aviso[];
      }),
      catchError(error => {
        console.error("Failed to fetch specific avisos:", error);
        return of([]); // Retorna um array vazio em caso de erro
      })
    );
  }
}

