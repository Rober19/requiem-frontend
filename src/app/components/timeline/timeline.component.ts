import { Component, OnInit } from '@angular/core';
import { resMsg } from 'rober19-config';
import { data_global } from '../../config/global.config';
import { UploadService } from '../../services/upload.service';
import { userService } from '../../services/user.service';
import { Router, ActivatedRoute, Params } from '@angular/router'

import * as moment from 'moment';
import { Ng2IzitoastService } from 'ng2-izitoast';

@Component({
  selector: 'timeline',
  templateUrl: './timeline.component.html',
  styleUrls: ['./timeline.component.css'],
  providers: []
})
export class TimelineComponent implements OnInit {
  public resMsg: any = resMsg;
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
    private _userService: userService,
    private iziToast: Ng2IzitoastService
  ) {   
    this.palo = [5, 34, 5, 2, 4, 3, 1];
    this.tabs = [false, false, false, false];
    this.tab = '';

  }

  ngOnInit() {
    if (!localStorage.getItem('identity')) {
      return this._router.navigate(['/login']);
    
    }
    this.lobby_tabs()

    //this._router.navigateByUrl('/timeline?tab=lobby&pag=1');
    this._router.navigateByUrl('/timeline?tab=chats');
  }  

  get_PublicationNOAUN(type?) {

    switch (type) {
      case "Previous":
        if (this.DefaultIndex > 0) {
          this.DefaultIndex--;
        } break;
      case "Next":
        this.DefaultIndex++;
        break;
    }

    //console.log(this.DefaultIndex)

    if (this.DefaultIndex >= 1) {

      this._userService.getPublications(data_global.UserData.sub, this.DefaultIndex).subscribe(
        data => {

          this.PublicationList = data;

          if (this.DefaultIndex > this.PublicationList.pages) {
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

          //console.log(data)

        }, err => {
          this.iziToast.error({
            title: 'Error',
            message: `${this.resMsg.serverErr}\n${err}`,
          });
        });
    }
  }

  async lobby_tabs() {

    await this._route.queryParamMap.subscribe(data => {
      this.paramsQuery = data;
      this.tab = this.paramsQuery.params;      

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
        case 'chats':
          this.tabs = [false, false, false, false];
          this.tabs[3] = true;
          break;
        default:
          console.log('nada')
          break;
      }
    });



  }
}