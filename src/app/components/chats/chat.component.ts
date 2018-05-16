import { Component, DoCheck, OnInit } from '@angular/core';
import * as data from 'rober19-config/config';

import { userService } from '../../services/user.service';
import { data_global } from '../../services/global';
import { User } from '../../models/user';

@Component({
  selector: 'chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})

export class ChatComponent implements OnInit {

  public resMsg: any;
  public user: any;
  public followings: Array<any>;
  public Chatpack: Array<any>;
  public receiveArr: Array<any>;

  public text: any;

  public userClick: any;
  public userClickChat: any;

  constructor(private _userService: userService) {
    this.resMsg = data.resMsg;

    this.user = data_global.UserData;
    this.userClick = {};

  }

  ngOnInit() {
    this.followingList()


  }

  public followingList() {

    this._userService.following(this.user._id).subscribe(res1 => {
      let res: any = res1;
      this.followings = res.users
      this.userClick = res.users[0].followed
      // this.GetMessage();

    }, err => {
      console.log(err)
    })

  }

  public LoadChatbyUser(user) {
    this.userClick = user.followed
    this.GetMessage()
  }

  public createMessage() {

    const data = {
      emitter: this.user._id,
      receiver: this.userClick._id,
      text: this.text
    }

    this._userService.createMessage(data).subscribe(res => {
      console.log(res)
      this.text = null
      this.GetMessage()
    }, err => {
      console.log(err)
    })
  }

  public GetMessage() {
    const data = {
      emitter: this.user._id,
      receiver: this.userClick._id,
    }
    this._userService.GetMessage(data).subscribe(res => {
      this.userClickChat = res
    }, err => {
      console.log(err)
    }
    )}

}