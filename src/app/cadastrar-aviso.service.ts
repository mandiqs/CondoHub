import { Injectable } from '@angular/core';
import { Firestore, collection, collectionData, addDoc, doc, deleteDoc, updateDoc } from '@angular/fire/firestore';
import { Aviso } from '../app/models/aviso'; 
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CadastrarAvisoService {

  constructor(private firestore: Firestore) { }

  async saveData(data: Aviso) {
    try {
      const collectionInstance = collection(this.firestore, 'aviso');
      await addDoc(collectionInstance, data);
      console.log("Salvo com sucesso");
      console.log(data);
    } catch (error) {
      console.error("Error", error);
    }
  }

  getData(): Observable<Aviso[]>{ //listar avisos
    const collectionRef = collection(this.firestore, 'aviso');
    return collectionData(collectionRef, {idField: 'id'}) as Observable<Aviso[]>
  }

  async deleteData(id: string) {
    try {
      const docRef = doc(this.firestore, 'aviso', id);
      await deleteDoc(docRef);
      console.log("Deletado com sucesso");
    } catch (error) {
      console.error('Erro ao deletar:', error);
    }
}

  async updateData(aviso: Aviso) {
    try {
      const docRef = doc(this.firestore, 'aviso', aviso.id);
      await updateDoc(docRef, { ...aviso });
      console.log("Atualizado com sucesso");
    } catch (error) {
      console.error('Erro ao editar:', error);
    }
  }
}
