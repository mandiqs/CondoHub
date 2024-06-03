import { Injectable } from '@angular/core';
import { Firestore, collection, addDoc } from '@angular/fire/firestore';
import { Aviso } from '../app/models/aviso'; 

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
}