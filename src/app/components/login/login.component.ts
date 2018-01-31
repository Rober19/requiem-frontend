import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit{
  private title:string;

  constructor(){
    this.title = 'ingrese su indetificacion'
  }

  ngOnInit(){
    console.log('componente cargado');
  }
}