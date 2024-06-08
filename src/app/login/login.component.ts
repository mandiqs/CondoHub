import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { DadosUsuario } from '../models/dados-usuario';
import { Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {

  user: DadosUsuario = {
    email: '',
    senha: ''
  };

  constructor(private authService: AuthService, private router: Router) {}

  login(): void {
    this.authService.login(this.user);
    sessionStorage.setItem('user', this.user.email);
    this.router.navigate(['home']);
  }
}

