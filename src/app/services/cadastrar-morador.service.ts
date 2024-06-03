import { Injectable } from '@angular/core';
import { Firestore, collection, collectionData, addDoc, CollectionReference } from '@angular/fire/firestore';
import { Morador } from '../models/morador'; 
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CadastrarMoradorService {

  constructor(private firestore: Firestore) { }

  async saveData(data: Morador) {
    try {
      const collectionInstance = collection(this.firestore, 'morador');
      await addDoc(collectionInstance, data);
      console.log("Salvo com sucesso");
      console.log(data);
    } catch (error) {
      console.error("Error", error);
    }
  }
  getData(): Observable<Morador[]>{ //listar moradores
    const collectionRef = collection(this.firestore, 'morador');
    return collectionData(collectionRef, {idField: 'id'}) as Observable<Morador[]>
  }
}



