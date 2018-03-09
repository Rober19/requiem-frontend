import { Component, DoCheck, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router'
import { userService } from './services/user.service';
import { data_global } from './services/global';
import { JwtHelper } from 'angular2-jwt';
import { resMsg } from '../app/config/config'
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [userService, JwtHelper]
})
export class AppComponent implements DoCheck, OnInit {
  public title: string;
  public ident;
  public resMsg: any;

  constructor(
    private _userService: userService,
    private _route: ActivatedRoute,
    private _router: Router,
    private _jwt: JwtHelper
  ) {
    this.title = 'app';
    this.resMsg = resMsg;
  }
  //onInit es para cuando se inicia el componente
  ngOnInit() {



  }
  //para comprobar
  ngDoCheck() {
    this.ident = this._userService.getIdent_login();
  }

  logOut() {
    localStorage.clear();
    this.ident = null;
    data_global.tokenDecode = {
      sub: undefined
    };
    this._router.navigate(['/lobby']);
  }

}
