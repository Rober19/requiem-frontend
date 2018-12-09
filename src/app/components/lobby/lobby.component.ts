import { Component, OnInit } from '@angular/core'
import { resMsg } from 'rober19-config';
import * as io from 'socket.io-client';
import { userService } from '../../services/user.service';
import { data_global } from '../../services/global';
import { ActivatedRoute, Router } from '@angular/router';
import { Ng2IzitoastService } from 'ng2-izitoast';
import { NUMBER_TYPE } from '@angular/compiler/src/output/output_ast';
import { NumberValueAccessor } from '@angular/forms/src/directives';

@Component({
  selector: 'lobby',
  templateUrl: './lobby.component.html',
  styleUrls: ['./lobby.component.css'],
  providers: []
})

export class LobbyComponent {

  public resMsg: any = resMsg;
  public UsersArr: Array<any>;
  public UserPages: Array<any>;
  public UserPag: number;
  public contentPage: number;
  public contentCurrent: number = 1;
  public current: number;
  public initial: number;
  private socket = io(data_global.url_socket);

  constructor(
    private _userService: userService,
    private _route: ActivatedRoute,
    private _router: Router,
    private iziToast: Ng2IzitoastService
  ) {    
    this.initial = 0;
    this.current = 5;

  }

  ngOnInit() {   
    this.UserPages = [];

    //console.log(`LOBBY ${this.resMsg.loaded}`)

    this._route.queryParams.subscribe(params => {
      this.UserPag = parseInt(params.pag);
      //console.log(params)
      this.user_Pages(params.pag)
    },
  err => {
    this.iziToast.error({
      title: 'Error',
      message: `${this.resMsg.serverErr}\n${err}`,
    });
  })



  }

  user_Pages(page) {
    this._userService.getUsers(page).subscribe(data1 => {
      let data: any = data1;
      //console.log(data)
      if (page > data.pages) return this._router.navigateByUrl('/timeline?tab=lobby&pag=1');
      this.UserPages.length = data.pages;
      this.UsersArr = data.users;
    },
      err => {
        this.iziToast.error({
          title: 'Error',
          message: `${this.resMsg.serverErr}\n${err}`,
        });
      })
  }

  current5() {
    if (this.UserPages.length >= this.current) {
      this.initial += 5;
      this.current += 5;
      this.contentCurrent++;
      this.contentPage = this.UserPages.length / 5;
      if (this.contentPage > (this.contentPage | 0)) {
        this.contentPage++;
      }

      //console.log(this.current, ` ${this.UserPages.length}`)
    }
  }

  prev5() {
    if (this.current >= 5) {
      this.initial -= 5;
      this.current -= 5;
      this.contentCurrent--; 
    }
  }

}