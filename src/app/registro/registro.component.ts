import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { DadosUsuario } from '../models/dados-usuario';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.scss'],
})
export class RegistroComponent {

  user: DadosUsuario = {
    email: '',
    senha: '',
    nome: '',
    apartamento: '',
    id: ''
  };

  constructor(private authService: AuthService, private router: Router) {}

  registro(): void {
    this.authService.registro(this.user)
      .then(() => {
        sessionStorage.setItem('user', this.user.email);
        this.router.navigate(['home']);
      })
      .catch(error => {
        console.log('Erro ao cadastrar:', error);
        alert('Erro ao cadastrar!');
      });
  }

  voltarParaLogin(): void {
    this.router.navigate(['login']);
  }
}
