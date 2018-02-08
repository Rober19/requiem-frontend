import { Component, DoCheck, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router'
import { userService } from './services/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [userService]
})
export class AppComponent implements DoCheck, OnInit {
    public title:string;
    public ident;

  constructor(
    private _userService: userService,
    private _route: ActivatedRoute,
    private _router: Router
  ){
    this.title = 'app';
  }
  //onInit es para cuando se inicia el componente
  ngOnInit(){
    this.ident = this._userService.getIdent_login();
    console.log(this.ident);
  }
  //para comprobar
  ngDoCheck(){
    this.ident = this._userService.getIdent_login();
  }

  logOut(){
    localStorage.clear();
    this.ident = null;
    this._router.navigate(['/lobby']);
  }

}
