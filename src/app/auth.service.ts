import { Injectable } from '@angular/core';
import { Auth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from '@angular/fire/auth';
import { Firestore, doc, setDoc, getDoc } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { DadosUsuario } from '../app/models/dados-usuario';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private auth: Auth, private firestore: Firestore, private router: Router) {}

  async login(dadosUsuario: DadosUsuario): Promise<void> {
    try {
      const userCredential = await signInWithEmailAndPassword(this.auth, dadosUsuario.email, dadosUsuario.senha);
      const userRef = doc(this.firestore, "users", userCredential.user.uid);
      const docSnap = await getDoc(userRef);
      
      if (docSnap.exists()) {
        const userType = docSnap.data()['tipoUsuario'];
        if (userType === 'síndico') {
          this.router.navigate(['home']); 
        } else {
          this.router.navigate(['home-morador']);
        }
        alert('Login feito com sucesso!');
      } else {
        throw new Error("Erro ao logar");
      }
    } catch (error) {
      console.error('Erro:', error);
      throw error; // Adicione esta linha para garantir que o erro seja propagado para o componente
    }
  }

  async registro(dadosUsuario: DadosUsuario): Promise<void> {
    try {
      const userCredential = await createUserWithEmailAndPassword(this.auth, dadosUsuario.email, dadosUsuario.senha);
      await setDoc(doc(this.firestore, "users", userCredential.user.uid), {
        nome: dadosUsuario.nome,
        email: dadosUsuario.email,
        tipoUsuario: dadosUsuario.tipoUsuario, // Salvando o tipo de usuário no Firestore
      });
      this.router.navigate([dadosUsuario.tipoUsuario === 'síndico' ? 'home' : 'home-morador']);
      alert('Cadastro realizado com sucesso!');
    } catch (error) {
      console.error('Erro:', error);
      alert('Erro ao cadastrar usuário!');
      throw error;
    }
  }

  logout(): void {
    this.auth.signOut().then(() => {
      sessionStorage.removeItem('morador');
      this.router.navigate(['login']);
    });
  }
}


