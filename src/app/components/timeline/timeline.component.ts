import { Component, OnInit } from '@angular/core';
import { resMsg } from '../../config/config';
import { data_global } from '../../services/global';
import { UploadService } from '../../services/upload.service';
import { userService } from '../../services/user.service';
import { } from '';

@Component({
  selector: 'timeline',
  templateUrl: './timeline.component.html',
  styleUrls: ['./timeline.component.css'],
  providers: []
})
export class TimelineComponent {
  public resMsg: any;
  public palo: Array<number>;

  constructor() {
    this.resMsg = resMsg;
    this.palo = [5, 34, 5, 2,4,3,1];
  }

  ngOnInit(){
    console.log(`${resMsg.confirm} timeline`);
  }
}