import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { } from './global'
import { User } from '../models/user';

@Injectable()
export class userService{
  public url:string;

  constructor(public _http: HttpClient){
    
  }

}