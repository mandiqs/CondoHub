import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { DadosUsuario } from '../models/dados-usuario';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {

  user: DadosUsuario = {
    email: '',
    senha: '',
    nome: '',
    apartamento: '',
    tipoUsuario: '',
    id: '',
  };

  constructor(private authService: AuthService, private router: Router) {}

  login(): void {
    this.authService.login(this.user)
      .then(() => {
        sessionStorage.setItem('user', this.user.email);
        // A navegação já é tratada no AuthService, então podemos remover esta linha
        // this.router.navigate(['home']);
      })
      .catch(error => {
        console.error('Login error:', error);
        alert('E-mail ou senha incorreto!');
      });
  }
}

