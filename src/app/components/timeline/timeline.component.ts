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

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
  ) {
    this.resMsg = resMsg;
    this.palo = [5, 34, 5, 2, 4, 3, 1];
    this.tab = '';


  }

  ngOnInit() {
    this.palos()
    
  }

  bool1() {
    if (this.bool) {
      this.bool = false
    } else {
      this.bool = true;
    }
  }

  async palos() {

    await this._route.queryParamMap.subscribe(data => {
      this.paramsQuery = data;
      this.tab = this.paramsQuery.params;
    });


    
  }
}