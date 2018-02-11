import { Component, OnInit } from '@angular/core'
import { JwtHelper } from 'angular2-jwt'
import { Router } from '@angular/router'

import { data_global } from '../../services/global'

@Component({
  selector: 'Home',
  templateUrl: './home.component.html',  
  styleUrls: ['./home.component.css'],
  providers: [JwtHelper]

})

export class HomeComponent implements OnInit{
  public title:string;
  public userData: any;
  constructor(
    private jwt: JwtHelper,
    private _router: Router
  ){
    this.title = 'Hub de USUARIO'
  }

  ngOnInit(){
    console.log('HOME - cargado')
    this.userData = this.jwt.decodeToken(localStorage.getItem('identity'));
    
  }

  logOut(){
    localStorage.clear();
    data_global.tokenDecode = {
      sub: undefined
    };    
    this._router.navigate(['/lobby']);

  }

}