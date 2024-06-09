import { Component, OnInit } from '@angular/core';
import { Firestore, collection, query, where, collectionData } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-home-morador',
  templateUrl: './home-morador.component.html',
  styleUrls: ['./home-morador.component.scss']
})
export class HomeMoradorComponent implements OnInit {
  avisos$: Observable<any[]> | undefined = undefined;  

  constructor(private firestore: Firestore) {}

  ngOnInit() {
    const avisosRef = collection(this.firestore, 'avisos');
    const q = query(avisosRef, where('eGeral', '==', true));
    this.avisos$ = collectionData(q, { idField: 'docId' });
  }
}



