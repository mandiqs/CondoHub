import { Injectable } from '@angular/core';
import { Firestore, collection, collectionData, addDoc, doc, deleteDoc, updateDoc } from '@angular/fire/firestore';
import { Porteiro } from '../app/models/porteiro'; 
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CadastrarPorteiroService {

  constructor(private firestore: Firestore) { }

  async saveData(data: Porteiro) {
    try {
      const collectionInstance = collection(this.firestore, 'porteiro');
      await addDoc(collectionInstance, data);
      console.log("Salvo com sucesso");
      console.log(data);
    } catch (error) {
      console.error("Error", error);
    }
  }

getData(): Observable<Porteiro[]>{ //listar porteiros
  const collectionRef = collection(this.firestore, 'porteiro');
  return collectionData(collectionRef, {idField: 'id'}) as Observable<Porteiro[]>
}

async deleteData(id: string) {
  try {
    const docRef = doc(this.firestore, 'porteiro', id);
    await deleteDoc(docRef);
    console.log("Deletado com sucesso");
  } catch (error) {
    console.error('Erro ao deletar:', error);
  }
}

async updateData(porteiro: Porteiro) {
  try {
    const docRef = doc(this.firestore, 'porteiro', porteiro.id);
    await updateDoc(docRef, { ...porteiro });
    console.log("Atualizado com sucesso");
  } catch (error) {
    console.error('Erro ao editar:', error);
  }
}

}


