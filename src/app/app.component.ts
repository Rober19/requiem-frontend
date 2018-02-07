import { Component } from '@angular/core';
import { userService } from './services/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [userService]
})
export class AppComponent {
    public title:string;
    public ident;

  constructor(
    private _userService: userService
  ){
    this.title = 'app';
  }

  ngOnInit(){
    this.ident = this._userService.getIdent_login();
    console.log(this.ident);
  }

}
