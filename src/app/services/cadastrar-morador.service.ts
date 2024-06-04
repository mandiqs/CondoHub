import { Injectable } from '@angular/core';
import { Firestore, collection, collectionData, addDoc, doc, updateDoc, deleteDoc } from '@angular/fire/firestore';
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

  getData(): Observable<Morador[]> {
    const collectionRef = collection(this.firestore, 'morador');
    return collectionData(collectionRef, { idField: 'id' }) as Observable<Morador[]>;
  }

  async deleteData(id: string) {
    try {
      const docRef = doc(this.firestore, 'morador', id);
      await deleteDoc(docRef);
      console.log("Deletado com sucesso");
    } catch (error) {
      console.error('Error deleting data:', error);
    }
  }

  async updateData(morador: Morador) {
    try {
      const docRef = doc(this.firestore, 'morador', morador.id);
      await updateDoc(docRef, { ...morador });
      console.log("Atualizado com sucesso");
    } catch (error) {
      console.error('Error updating data:', error);
    }
  }
}





