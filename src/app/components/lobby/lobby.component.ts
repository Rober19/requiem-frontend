import { Component, OnInit } from '@angular/core'
import * as rober19_config from 'rober19-config/config';
import { userService } from '../../services/user.service';

@Component({
  selector: 'lobby',
  templateUrl: './lobby.component.html',
  styleUrls: ['./lobby.component.css'],
  providers: []
})

export class LobbyComponent {

  public palo: any;
  public resMsg: any;
  public UsersArr: Array<any>;

  constructor(    
    private _userService: userService,   
    ) {
    this.resMsg = rober19_config.resMsg;
  }

  ngOnInit() {
    this.palo = [1, 2, 3, 4];
    console.log(`LOBBY ${this.resMsg.loaded}`)

    this._userService.getUsers('1').subscribe(data1 => {
      let data: any = data1;

      console.log(data)
      this.UsersArr = data.users;
      
      



    })
  }

}