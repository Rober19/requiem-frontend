import { Component, DoCheck, OnInit, AfterViewInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router'
import { userService } from './services/user.service';
import { data_global } from './services/global';
import * as data from 'rober19-config/config';
import * as io from 'socket.io-client';
import { Ng2IzitoastService } from 'ng2-izitoast';

// Nofitication Push Modules //

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [userService]
})
export class AppComponent implements DoCheck, OnInit, AfterViewInit {
  public title: string;
  public ident;
  public resMsg: any;
  private socket = io(data_global.url_socket);
  //socket = io('http://192.168.1.63:3000');

  constructor(
    private _userService: userService,
    private _route: ActivatedRoute,
    private _router: Router,
    private iziToast: Ng2IzitoastService
  ) {
    this.title = 'app';
    this.resMsg = data.resMsg;

  }


  //onInit es para cuando se inicia el componente
  ngOnInit() {



    // this.socket.emit('-myNotification', { option: 'like', message: 'hola' })
    // this.socket.on('-myNotification', (data) => {
    //   console.log(data);      
    // });

  }

  ngAfterViewInit() {

    if (localStorage.getItem('identity') && data_global.UserData.sub == undefined) {
      let parseJ = JSON.parse(localStorage.getItem('user'));

      data_global.UserData = parseJ;
      data_global.UserData.sub = parseJ._id;

      let params : any;
      this._route.queryParams
        .subscribe(async res => {
          params = await res;          
        })


      console.log('no estoy en chat')
      this.socket.on('chaton', data => {
        if (data.receiver == data_global.UserData.sub) {
          console.log(data)
          console.log(params)
          if (params.tab != 'chats') {
            this.notificationMsg(data);
          }
        }
      });








    } else {
      console.log('Nadie en Storage')
    }

    console.log('app iniciado')
  }


  //para comprobar -- Este proceso necesita optimizacion - pero aun no es prescindible
  ngDoCheck() {
    this.ident = this._userService.getIdent_login();
  }

  notificationMsg(data) {
    this.iziToast.show({
      id: 'haduken',
      theme: 'light',
      icon: 'icon-contacts',
      title: `${data.eData.nick}`,
      message: `${data.text}`,
      position: 'topCenter',
      transitionIn: 'flipInX',
      transitionOut: 'flipOutX',
      progressBarColor: 'rgb(0, 255, 184)',
      image: data.eData.image,
      imageWidth: 70,
      layout: 2,
      onClosing: function () {
        //console.info('onClosing');
      },
      onClosed: function (instance, toast, closedBy) {
        //console.info('Closed | closedBy: ' + closedBy);
      },
      iconColor: 'rgb(0, 255, 184)'
    });
  }

  logOut() {
    localStorage.clear();
    this.ident = null;
    data_global.UserData.sub = undefined;
    this._router.navigate(['/login']);
  }

}
