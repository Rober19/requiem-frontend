import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { data_global } from './global'
import { resMsg } from '../config/config'
import { User } from '../models/user';


@Injectable()
export class userService{
  public url:string;
 

  constructor(public _http: HttpClient){
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

}