import { Component, OnInit } from '@angular/core'
import { JwtHelper } from 'angular2-jwt'
import { Router } from '@angular/router'
import { resMsg } from '../../config/config'
import { data_global } from '../../services/global'
import { userService } from '../../services/user.service';
import * as io from 'socket.io-client';
import { User } from '../../models/user';

@Component({
  selector: 'Home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers: [JwtHelper]
})

export class HomeComponent implements OnInit {

  public title: string;
  public userData: any;
  public Counters: any;
  public resMsg: any;

  // socket = io('http://192.168.1.63:3000');

  constructor(
    private _jwt: JwtHelper,
    private _router: Router,
    private userService: userService
  ) {
    this.title = 'Hub de USUARIO';
    this.Counters = {
      followers: '',
      following: '',
      publications: ''
    };

    this.userData = new User(
      '',
      '',
      '',
      '',
      '',
      '',
      '',
      '',
      '',
    )
    
    this.resMsg = resMsg;
  }

  ngOnInit() {

    if (localStorage.getItem('identity') && data_global.tokenDecode.sub == undefined) {
      try {
        data_global.tokenDecode = this._jwt.decodeToken(JSON.parse(localStorage.getItem('identity')));
      } catch (err) {

      }

      //this._jwt.decodeToken(JSON.parse(localStorage.getItem('identity')));
    } else {
      console.log('Nadie en Storage')
    }

    if (!localStorage.getItem('identity')) {

      return this._router.navigate(['/lobby']);

    } else {
      console.log(`HOME ${resMsg.loaded}`)
      //aqui ponemos los datos decodificados del token para pintarlos en la vista
      this.userData = data_global.tokenDecode;
      this.userData.image += '?random+\=' + Math.random();
      if (this.Counters.followers != '') {

      } else {
        this.getCounters(this.userData.sub);
      }


      ;
    }



  }

  testSocket() {
    //this.socket.emit('myNotification', { option: 'like', message: 'hola'})
  }

  getCounters(id) {
    this.userService.getCounters(id).subscribe(
      data => {
        this.Counters = data;
      },
      err => {
        console.log(err);
      })

  }
  logOut() {
    localStorage.clear();
    data_global.tokenDecode.sub = undefined;
    this._router.navigate(['/lobby']);

  }

}