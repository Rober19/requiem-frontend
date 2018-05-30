import { Component, DoCheck, OnInit, ChangeDetectorRef } from '@angular/core';
import * as data from 'rober19-config/config';
import * as io from 'socket.io-client';
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
  public input: any;

  public text: any;
  private socket = io(data_global.url);
  public userClick: any;
  public userClickChat: any;

  constructor(
    private _userService: userService,
    private cdRef: ChangeDetectorRef
  ) {
    this.resMsg = data.resMsg;

    this.user = data_global.UserData;
    this.userClick = {};
    this.socket.on('chaton', data => {
      if (data.receiver == this.user._id) {
        this.GetMessage();
      }
    });
  }

  ngOnInit() {
    this.followingList()
  }

  public followingList() {

    this._userService.following(this.user._id).subscribe(res1 => {
      let res: any = res1;
      this.followings = res.users
      this.userClick = res.users[0].followed
      //this.GetMessage();

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
      this.socket.emit('chaton', data)
      this.GetMessage()
    }, err => {
      console.log(err)
    })

  }

  GetMessage() {
    const data = {
      emitter: this.user._id,
      receiver: this.userClick._id,
    }
    this._userService.GetMessage(data).subscribe(res => {
      this.userClickChat = res
    }, err => {
      console.log(err)
    }
    )
  }

  mess() {
    var objDiv = document.getElementById("chateo1");
    objDiv.scrollTop = objDiv.scrollHeight;
  }


}