import { Component, DoCheck, OnInit } from '@angular/core';
import { resMsg } from 'rober19-config/config';

@Component({
  selector: 'chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})

export class ChatComponent implements OnInit{

  public resMsg: any;

  constructor () {
    this.resMsg = new resMsg;
  }

  ngOnInit(){
    console.log('Chat');
  }

}