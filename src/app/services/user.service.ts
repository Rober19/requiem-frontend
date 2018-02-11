import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { data_global } from './global'
import { resMsg } from '../config/config'
import { User } from '../models/user';


@Injectable()
export class userService{
  public url:string;
  public  ident_login;
  public token_login;
 

  constructor(
    private _http: HttpClient    
  ){
    this.url = data_global.url;
  }

  //aqui van las peticiones http
  register(user : User): Observable<any>{

    const model = JSON.stringify(user);
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    

    return this._http.post(`${this.url}/register`, model,  {headers: headers})
  }

  login(user : User, tokenget = null): Observable<any>{

    if (tokenget != null){
      user.tokenget = tokenget;
    }

    const model = JSON.stringify(user);
    const headers = new HttpHeaders().set('Content-Type', 'application/json');

    return this._http.post(`${this.url}/login`, model, { headers: headers });
  }

  getIdent_login(){
    const identity = JSON.parse(localStorage.getItem('identity'));   
    

    if(identity){
      this.ident_login = identity;
    } else {
      this.ident_login = null;
    }

    return identity;
  }

  // getToken_login(){
  //   const token = JSON.parse(localStorage.getItem('token'));

  //   if(token){
  //     this.token_login = token;
  //   } else {
  //     this.token_login = null;
  //   }
  // }

}