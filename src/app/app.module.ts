import { NgModule } from '@angular/core';
import { BrowserModule, platformBrowser } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ButtonComponent } from './components/button/button.component';
import { LoginComponent } from './pages/login/login.component';
import { FormsModule } from '@angular/forms';
import { HomeComponent } from './pages/home/home.component';
import { MenuComponent } from './components/menu/menu.component';

//Material Icons
import { MatIconModule } from '@angular/material/icon';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { environment } from '../environments/environment.development';
import { AngularFireModule } from '@angular/fire/compat';
import { CadastroMoradorComponent } from './pages/cadastro-morador/cadastro-morador.component';
import { CadastroPorteirosComponent } from './pages/cadastro-porteiros/cadastro-porteiros.component';
import { CadastroAvisosComponent } from './pages/cadastro-avisos/cadastro-avisos.component';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { GerenciarMoradorComponent } from './pages/gerenciar-morador/gerenciar-morador.component';


@NgModule({
  declarations: [
    AppComponent,
    ButtonComponent,
    LoginComponent,
    HomeComponent,
    MenuComponent,
    CadastroMoradorComponent,
    CadastroPorteirosComponent,
    CadastroAvisosComponent,
    GerenciarMoradorComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    MatIconModule,
    MatProgressSpinnerModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    provideFirebaseApp(() => initializeApp({"projectId":"projetoangularcondohub","appId":"1:131801251002:web:2df1259be788f9a372d683","storageBucket":"projetoangularcondohub.appspot.com","apiKey":"AIzaSyAHME7wAKt55Vmp__N3IdurmHyHUNdVlm8","authDomain":"projetoangularcondohub.firebaseapp.com","messagingSenderId":"131801251002","measurementId":"G-G5M4021LQJ"})),
    provideAuth(() => getAuth()),
    provideFirestore(() => getFirestore()),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
