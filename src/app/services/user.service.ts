import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { data_global } from './global'
import { resMsg } from 'rober19-config/config';
import { User } from '../models/user';
import { Publication } from '../models/publication';


@Injectable()
export class userService {
  public url: string;
  public ident_login;
  public token_login;


  constructor(
    private _http: HttpClient
  ) {
    this.url = data_global.url;
  }

  //aqui van las peticiones http
  register(user: User): Observable<any> {

    const model = JSON.stringify(user);
    const headers = new HttpHeaders().set('Content-Type', 'application/json');


    return this._http.post(`${this.url}/register`, model, { headers: headers })
  }


  login(user: User, tokenget = null): Observable<any> {

    if (tokenget != null) {
      user.tokenget = tokenget;
    }

    const model = JSON.stringify(user);
    const headers = new HttpHeaders().set('Content-Type', 'application/json');

    return this._http.post(`${this.url}/login`, model, { headers: headers });
  }

  publication(pub: Publication): Observable<any> {

    const model = JSON.stringify(pub);
    const headers = new HttpHeaders()
      .set('Authorization', localStorage.getItem('identity'))
      .set('Content-Type', 'application/json');

    return this._http.post(`${this.url}/publication`, model, { headers: headers });
  }

  getPublications(userId, page) {

    let headers = new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('Authorization', localStorage.getItem('identity'));

    return this._http.get(`${this.url}/publications/${userId}?page=${page}`, { headers: headers });

  }

  getIdent_login() {
    const identity = JSON.parse(localStorage.getItem('identity'));


    if (identity) {
      this.ident_login = identity;
    } else {
      this.ident_login = null;
    }

    return identity;
  }

  getStats() {
    let stats = JSON.parse(localStorage.getItem('stats'));

    if (stats) {

    } else {

    }
  }

  getCounters(userId): Observable<any> {

    let headers = new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('Authorization', localStorage.getItem('identity'));

    return this._http.get(`${this.url}/get-counters/${userId}`, { headers: headers });

  }

  getTokenNoUsar(userId): Observable<any> {

    let headers = new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('Authorization', localStorage.getItem('identity'))
      .set('admin_secret', data_global.admin_secret);

    return this._http.get(`${this.url}/user/${userId}`, { headers: headers });

  }

  getUsers(page): Observable<any> {

    let headers = new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('Authorization', localStorage.getItem('identity'));

    return this._http.get(`${this.url}/users?page=${page}`, { headers: headers });
  }

  getUser(id) {
    let headers = new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('Authorization', localStorage.getItem('identity'));

    return this._http.get(`${this.url}/user/${id}`, { headers: headers });
  }

  // TODO: Separar la lógica correspondiente a [follow] a otro servicio.

  public follow(data): Observable<any> {
    const headers = new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('Authorization', localStorage.getItem('identity'));
    return this._http.post(`${this.url}/follow`, data, { headers: headers });
  }

  public unfollow(data): Observable<any> {
    const headers = new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('Authorization', localStorage.getItem('identity'));
    return this._http.post(`${this.url}/unfollow`, data, { headers: headers });
  }

  public isFollow(id) {
    let headers = new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('Authorization', localStorage.getItem('identity'));

    return this._http.get(`${this.url}/follow/${id}`, { headers: headers });
  }

  public following(id): Observable<any> {
    const headers = new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('Authorization', localStorage.getItem('identity'));
    return this._http.get(`${this.url}/following/${id}`, { headers: headers });
  }

  // getToken_login(){
  //   const token = JSON.parse(localStorage.getItem('token'));

  //   if(token){
  //     this.token_login = token;
  //   } else {
  //     this.token_login = null;
  //   }
  // }


  // TODO: Separar la lógica correspondiente a [chat] a otro servicio.

  public createMessage(data) {
    const headers = new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('Authorization', localStorage.getItem('identity'));
    return this._http.post(`${this.url}/message`, data, { headers: headers });
  }

  public GetMessage(data) {
    const headers = new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('Authorization', localStorage.getItem('identity'));
    return this._http.post(`${this.url}/messages`, data, { headers: headers });
  }

}