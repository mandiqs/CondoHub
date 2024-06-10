import { Injectable } from '@angular/core';
import { Firestore, collection, collectionData, addDoc, doc, deleteDoc, updateDoc, query, where } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Aviso } from '../app/models/aviso';

@Injectable({
  providedIn: 'root'
})
export class CadastrarAvisoService {
  constructor(private firestore: Firestore) { }

  // Método para salvar ou atualizar um aviso
  saveData(aviso: Aviso): Promise<void> {
    const cleanAviso = {...aviso};
    if (aviso.id) {
      // Atualiza o aviso existente se um ID estiver presente
      const docRef = doc(this.firestore, 'avisos', aviso.id);
      return updateDoc(docRef, cleanAviso);
    } else {
      // Cria um novo aviso se não houver ID
      const collectionRef = collection(this.firestore, 'avisos');
      return addDoc(collectionRef, cleanAviso).then(docRef => {
        console.log("Novo aviso adicionado com ID: ", docRef.id);
        aviso.id = docRef.id;
      });
    }
  }

  // Método para obter todos os avisos
  getData(): Observable<Aviso[]> {
    const collectionRef = collection(this.firestore, 'avisos');
    return collectionData(collectionRef, { idField: 'id' }) as Observable<Aviso[]>;
  }

  // Método para deletar um aviso
  deleteData(id: string): Promise<void> {
    if (!id) {
      throw new Error("ID é necessário para deletar um aviso");
    }
    const docRef = doc(this.firestore, 'avisos', id);
    return deleteDoc(docRef);
  }

  // Método para atualizar um aviso
  updateData(aviso: Aviso): Promise<void> {
    if (!aviso.id) {
      throw new Error("ID é necessário para atualizar um aviso");
    }
    const cleanAviso = {...aviso}; // Cria uma cópia limpa do aviso para atualização
    const docRef = doc(this.firestore, 'avisos', aviso.id);
    return updateDoc(docRef, cleanAviso);
  }

  getRelevantAvisos(moradorId: string): Observable<Aviso[]> {
    const avisosCollectionRef = collection(this.firestore, 'avisos');
    const queryRef = query(avisosCollectionRef, where('moradorId', 'in', ['geral', moradorId]));
    return collectionData(queryRef, { idField: 'id' }) as Observable<Aviso[]>;
  }
}




