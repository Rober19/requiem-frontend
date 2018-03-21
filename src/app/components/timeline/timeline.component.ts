import { Component, OnInit } from '@angular/core';
import { resMsg } from '../../config/config';
import { data_global } from '../../services/global';
import { UploadService } from '../../services/upload.service';
import { userService } from '../../services/user.service';
import { } from '';
import { Router, ActivatedRoute, Params } from '@angular/router'

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

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
  ) {
    this.resMsg = resMsg;
    this.palo = [5, 34, 5, 2, 4, 3, 1];
    this.tabs = [false, false, false, false];
    this.tab = '';


  }

  ngOnInit() {
    this.palos()
    
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