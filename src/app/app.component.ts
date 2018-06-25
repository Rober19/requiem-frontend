import { Component, DoCheck, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router'
import { userService } from './services/user.service';
import { data_global } from './services/global';
import * as data from 'rober19-config/config';
import * as io from 'socket.io-client';

// Nofitication Push Modules //

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [userService]
})
export class AppComponent implements DoCheck, OnInit {
  public title: string;
  public ident;
  public resMsg: any;

  //socket = io('http://192.168.1.63:3000');

  constructor(
    private _userService: userService,
    private _route: ActivatedRoute,
    private _router: Router
  ) {
    this.title = 'app';
    this.resMsg = data.resMsg;

  }


  //onInit es para cuando se inicia el componente
  ngOnInit() {
    if (localStorage.getItem('identity') && data_global.UserData.sub == undefined) {
      let parseJ = JSON.parse(localStorage.getItem('user'));
      data_global.UserData = parseJ;
      data_global.UserData.sub = parseJ._id;      
      ;
    } else {
      console.log('Nadie en Storage')
    }

    console.log('app iniciado')
    // this.socket.emit('-myNotification', { option: 'like', message: 'hola' })
    // this.socket.on('-myNotification', (data) => {
    //   console.log(data);      
    // });

  }

  //para comprobar
  ngDoCheck() {
    this.ident = this._userService.getIdent_login();
  }

  logOut() {
    localStorage.clear();
    this.ident = null;
    data_global.UserData.sub = undefined;
    this._router.navigate(['/login']);
  }

}
