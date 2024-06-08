import { Injectable } from '@angular/core';
import { Auth, signInWithEmailAndPassword } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { DadosUsuario } from '../app/models/dados-usuario';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private auth: Auth, private router: Router) {}

  login(dadosUsuario: DadosUsuario): Promise<void> {
    return signInWithEmailAndPassword(this.auth, dadosUsuario.email, dadosUsuario.senha).then(() => {
      alert('Login feito com sucesso!');
      this.router.navigate(['/']);
    }).catch((error) => {
      console.log('Error:', error);
      alert('E-mail ou senha incorreto!');
    });
  }
}

