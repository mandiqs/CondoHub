import { Injectable } from '@angular/core';
import { Firestore, collection, addDoc } from '@angular/fire/firestore';
import { Porteiro } from '../app/models/porteiro'; 

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
}
