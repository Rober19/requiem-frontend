import { Component, OnInit } from '@angular/core';
import { resMsg } from '../../config/config';
import { data_global } from '../../services/global';
import { UploadService } from '../../services/upload.service';
import { userService } from '../../services/user.service';
import { } from '';
import { Router, ActivatedRoute, Params } from '@angular/router'

import * as moment from 'moment';

@Component({
  selector: 'timeline',
  templateUrl: './timeline.component.html',
  styleUrls: ['./timeline.component.css'],
  providers: []
})
export class TimelineComponent implements OnInit {
  public resMsg: any;
  public palo: Array<number>;
  public paramsQuery: any;
  public tab: any;
  public bool: boolean;
  public tabs: Array<boolean>;

  public PublicationList: any;
  public PublicationArray: Array<any>;

  myDate: Date;
  DefaultIndex: number = 1;

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _userService: userService
  ) {
    this.resMsg = resMsg;
    this.palo = [5, 34, 5, 2, 4, 3, 1];
    this.tabs = [false, false, false, false];
    this.tab = '';

  }

  ngOnInit() {
    this.palos()
    this.get_Publication();
  }

  bool1() {
    switch (this.tab) {
      case 'lobby':
        this.tabs = [false, false, false, false];
        this.tabs[0] = true;
        break;
      case 'home':
        this.tabs = [false, false, false, false];
        this.tabs[1] = true;
        break;
      case 'profile':
        this.tabs = [false, false, false, false];
        this.tabs[2] = true;
        break;

      default:
        break;
    } 
  }

  get_Publication(type?) {

    switch(type){
      case "Previous" :
        this.DefaultIndex--;
        break;
      case "Next" :
        this.DefaultIndex++;
        break; 
    }

    console.log(this.DefaultIndex)

    if (this.DefaultIndex >= 1){

    this._userService.getPublications(data_global.tokenDecode.sub, this.DefaultIndex).subscribe(
      data => {
        
      this.PublicationList = data;

        if (this.DefaultIndex > this.PublicationList.pages){
          this.DefaultIndex = this.PublicationList.pages
          return;
        }

      this.PublicationArray = this.PublicationList.data;
 
      /* 
        La fecha de creación del usuario se encuentra en formato unix 
          created_at: "1522683294"
        
        por lo tanto se debe hacer conversión en un formato de fecha entendible 
          created_at: "2018-04-02 10:34"      
      */

      this.PublicationArray.map(r => {
        r.created_at = moment.unix(Number(r.created_at)).format("YYYY-MM-DD HH:mm");
      })

      console.log(data)

    }, err => {
      console.log(err);
    });
  }
  }

  async palos() {

    await this._route.queryParamMap.subscribe(data => {
      this.paramsQuery = data;
      this.tab = this.paramsQuery.params;
      console.log(this.tab)

      switch (this.tab.tab) {
        case 'lobby':
          this.tabs = [false, false, false, false];
          this.tabs[0] = true;
          break;
        case 'home':
          this.tabs = [false, false, false, false];
          this.tabs[1] = true;
          break;
        case 'profile':
          this.tabs = [false, false, false, false];
          this.tabs[2] = true;
          break;  
        default:
        console.log('nada')
          break;
      }
    });



  }
}