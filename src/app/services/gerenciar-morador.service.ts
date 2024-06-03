import { Injectable } from '@angular/core';
import { GerenciarMoradorComponent } from '../pages/gerenciar-morador/gerenciar-morador.component';
import { Firestore, collection, addDoc} from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class GerenciarMoradorService {

  constructor( private firestore: Firestore) { }

  saveData(data: GerenciarMoradorComponent){
    const collectionInstance = collection(this.firestore, 'morador');
    addDoc(collectionInstance, data)
    .then(()=>{
      console.log("Salvo com sucesso");
      console.log(data);
    }).catch((error) => {
      console.log("Error", error);
    })
  }
}
