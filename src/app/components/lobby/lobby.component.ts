import { Component, OnInit } from '@angular/core'
import { resMsg } from '../../config/config'

@Component({
  selector: 'lobby',
  templateUrl: './lobby.component.html',
  styleUrls: ['./lobby.component.css'],
  providers: []
})

export class LobbyComponent {

  public palo: Array<number>;
  public resMsg: any;

  constructor() {
    this.resMsg = resMsg;
  }

  ngOnInit() {
    this.palo = [1, 2, 3, 4];
    console.log(`LOBBY ${resMsg.loaded}`)
  }

}