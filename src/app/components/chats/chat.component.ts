import { Component, DoCheck, OnInit } from '@angular/core';

@Component({
  selector: 'chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})

export class ChatComponent implements OnInit{

  public resMsg: any;

  constructor () {

  }

  ngOnInit(){
    console.log('Chat');
  }

}