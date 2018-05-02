import { Component, OnInit } from '@angular/core'
import * as rober19_config from 'rober19-config/config';
import { userService } from '../../services/user.service';
import { ActivatedRoute, Router } from '@angular/router';

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
  public UserPages: Array<any>;
  public UserPag: number;
  public current: number;
  public initial: number;
  

  constructor(
    private _userService: userService,
    private _route: ActivatedRoute,
    private _router: Router,
  ) {
    this.resMsg = rober19_config.resMsg;
    this.initial = 0;
    this.current = 5;
  }

  ngOnInit() {
    this.palo = [1, 2, 3, 4];
    this.UserPages = [];

    console.log(`LOBBY ${this.resMsg.loaded}`)

    this._route.queryParams.subscribe(params => {
      this.UserPag = parseInt(params.pag);
      this.user_Pages(params.pag)
    })


  }

  user_Pages(page) {
    this._userService.getUsers(page).subscribe(data1 => {
      let data: any = data1;
      console.log(data)
      if (page > data.pages) return this._router.navigateByUrl('/timeline?tab=lobby&pag=1');;
      this.UserPages.length = data.pages;
      this.UsersArr = data.users;
    })
  }

  current5() {
    if (this.UserPages.length >= this.current) {
      this.initial += 5;
      this.current += 5;
      console.log(this.current)
    }
  }

  prev5() {
    if (this.current>=5) {
      this.initial -= 5;
      this.current -= 5;
      console.log(this.current)
    }
  }

}