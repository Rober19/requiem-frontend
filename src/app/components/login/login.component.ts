import { Component, OnInit } from '@angular/core';
import { resMsg } from '../../config/config'
import { User } from '../../models/user';
import { userService } from '../../services/user.service'

import { Router, ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [userService]
})

export class LoginComponent implements OnInit{
  private title:string;
  private config:any;
  private login_user: User;
  private ident;
  private getToken;


  constructor(
    private userService:userService,
    // private _route: ActivatedRoute,
    // private _router: Router,
  ){
    this.title = 'ingrese su indetificacion'
    this.config = resMsg;
    this.login_user = new User(
      '',
      '',
      '',
      '',
      '',
      '',
      '',
      '',
    );
    
  }

  ngOnInit(){
    console.log('componente cargado');
  }

  prueba(){
    console.log(this.login_user);    
  }

  sendLogin(){
    this.userService.login(this.login_user).subscribe(
      res => {
        this.ident = res
      },
      err => {
        console.log(err)
      }
    )
  }

}