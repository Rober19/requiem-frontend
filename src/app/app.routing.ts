import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
//componentes
import { RegisterComponent } from './components/register/register.component'
import { LoginComponent } from './components/login/login.component'
import { HomeComponent } from './components/home/home.component';
import { LobbyComponent } from './components/lobby/lobby.component';
import { ProfileComponent } from './components/profile/profile.component';

const appRoutes: Routes = [
  { path: '', component: LobbyComponent},
  { path: '*', component: LobbyComponent},
  { path: 'lobby', component: LobbyComponent},
  { path: 'home', component: HomeComponent},
  { path: 'login', component: LoginComponent},
  { path: 'register', component: RegisterComponent},
  { path: 'profile', component: ProfileComponent}  
];

export const appRoutingProviders: any[] = [];
export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);