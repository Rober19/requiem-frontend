import { Component, OnInit } from '@angular/core'
import { data_global } from '../../services/global'
import { userService } from '../../services/user.service';
import { resMsg } from '../../config/config'

@Component({
  selector: 'Profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})

export class ProfileComponent implements OnInit {

  public userData: any;
  public resMsg: any;

  constructor() {
    
  }

  ngOnInit() {
    this.userData = data_global.tokenDecode;  
    this.resMsg = resMsg;


  }

}