import { Injectable } from '@angular/core';
import { Auth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { DadosUsuario } from '../app/models/dados-usuario';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private auth: Auth, private router: Router) {}

  login(dadosUsuario: DadosUsuario): Promise<void> {
    return signInWithEmailAndPassword(this.auth, dadosUsuario.email, dadosUsuario.senha)
      .then(() => {
        alert('Login feito com sucesso!');
      })
      .catch((error) => {
        console.log('Error:', error);
        alert('E-mail ou senha incorreto!');
        throw error;
      });
      }

  async registro(dadosUsuario: DadosUsuario): Promise<void> {
    try {
      await createUserWithEmailAndPassword(this.auth, dadosUsuario.email, dadosUsuario.senha);
      alert('Cadastro realizado com sucesso!');
      this.router.navigate(['home']);
    } catch (error) {
      console.log('Error:', error);
      alert('Erro ao cadastrar usuário!');
      throw error;
    }
  }

  logout(): void {
    this.auth.signOut().then(() => {
      sessionStorage.removeItem('user');
      this.router.navigate(['login']);
    });
  }
}