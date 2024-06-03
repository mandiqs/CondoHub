
import { Injectable } from '@angular/core';
import { Firestore, collection, addDoc } from '@angular/fire/firestore';
import { Morador } from '../models/morador'; // Certifique-se de ajustar o caminho conforme necessário

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
}
