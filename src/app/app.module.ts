import { BrowserModule } from '@angular/platform-browser';
//para hacer el routing
import { NgModule } from '@angular/core';
//el providers va en providers de NgModule
import { routing, appRoutingProviders } from './app.routing';
//para usar forms
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http'
import { AppComponent } from './app.component';

import { Ng2IziToastModule } from 'ng2-izitoast';
import { SweetAlert2Module } from '@toverux/ngx-sweetalert2';

import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { LobbyComponent } from './components/lobby/lobby.component';
import { ProfileComponent } from './components/profile/profile.component';
import { TimelineComponent } from './components/timeline/timeline.component'
import { ChatComponent } from './components/chats/chat.component'

/* Configuración Moment.js en Angular */
import { MomentModule } from 'angular2-moment';
import * as moment from 'moment';
moment.locale('es');

@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,
    LoginComponent,
    HomeComponent,
    LobbyComponent,
    ProfileComponent,
    TimelineComponent,
    ChatComponent    
  ],
  imports: [
    BrowserModule,
    routing,
    FormsModule,
    HttpClientModule,
    MomentModule,
    Ng2IziToastModule,        
    SweetAlert2Module.forRoot({})     
  ],
  providers: [
    appRoutingProviders
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
