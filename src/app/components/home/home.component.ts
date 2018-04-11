import { Component, OnInit } from '@angular/core'
import { NgForm } from '@angular/forms';
import { JwtHelper } from 'angular2-jwt'
import { Router } from '@angular/router'
import { resMsg } from '../../config/config'
import { data_global } from '../../services/global'
import { userService } from '../../services/user.service';
import * as io from 'socket.io-client';
import { User } from '../../models/user';
import { Publication } from '../../models/publication';

@Component({
  selector: 'Home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers: [JwtHelper, userService]
})

export class HomeComponent implements OnInit {

  public title: string;
  public userData: any;
  public Counters: any;
  public resMsg: any;
  public Publication: Publication;

  // socket = io('http://192.168.1.63:3000');

  constructor(
    private _jwt: JwtHelper,
    private _router: Router,
    private _userService: userService
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
        console.warn('$TOKEN DECODE$')
      } catch (err) {

      }

      //this._jwt.decodeToken(JSON.parse(localStorage.getItem('identity')));
    } else {
      console.log('Nadie en Storage')
    }

    if (!localStorage.getItem('identity')) {

      return this._router.navigate(['/login']);

    } else {
      console.log(`HOME ${resMsg.loaded}`)
      //aqui ponemos los datos decodificados del token para pintarlos en la vista
      this.userData = data_global.tokenDecode;
      //this.userData.image += '?random+\=' + Math.random();
      if (this.Counters.followers != '') {

      } else {
        this.getCounters(this.userData.sub);
      }


      ;
    }



  }


  post_Publication(dataForm) {

    const user = this.userData;
    const publication = dataForm.value.publication;

    this.Publication = new Publication(user.sub, publication, null, "", user);

    // Verificar que la publicación no sea solo espacios en blanco ó "undefined"
    if (!(publication.trim("") === "" || publication === undefined)) {

      this._userService.publication(this.Publication).subscribe(
        data => {
          console.log(data);
          dataForm.reset();
        }, err => {
          console.log(err);
        });

    }


  }

  onChange(event) {
    const files = event.srcElement.files[0];
    console.log(files);
  }

  testSocket() {
    //this.socket.emit('myNotification', { option: 'like', message: 'hola'})
  }

  getCounters(id) {
    this._userService.getCounters(id).subscribe(
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