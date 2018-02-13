import { Component, DoCheck, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router'
import { userService } from './services/user.service';
import { data_global } from './services/global';
import { JwtHelper } from 'angular2-jwt'
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [userService, JwtHelper]
})
export class AppComponent implements DoCheck, OnInit {
  public title: string;
  public ident;


  constructor(
    private _userService: userService,
    private _route: ActivatedRoute,
    private _router: Router,
    private _jwt: JwtHelper
  ) {
    this.title = 'app';
  }
  //onInit es para cuando se inicia el componente
  ngOnInit() {

    if (localStorage.getItem('identity')) {
      try {
        data_global.tokenDecode = this._jwt.decodeToken(JSON.parse(localStorage.getItem('identity')));
        console.log(data_global.tokenDecode);
      } catch (err) {

      }

      //this._jwt.decodeToken(JSON.parse(localStorage.getItem('identity')));
    } else {
      console.log('Nadie en Storage')
    }

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
