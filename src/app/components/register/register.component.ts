import { Component } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { User } from '../../models/user';
import { userService } from '../../services/user.service';
import * as rober19_config from 'rober19-config/config';
import { data_global } from '../../services/global'
import * as sweetalert from 'sweetalert'

@Component({
  selector: 'register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  providers: [userService]
})

export class RegisterComponent {
  public header_p1: string;
  public Model_user: User;
  public a1: string;
  public resMsg: any;
  public respMsg: any;
  public validf: boolean;
  public errorf: boolean;

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _userService: userService
  ) {
    this.a1 = "disabled"
    this.header_p1 = 'ingrese los datos';      
    this.resMsg = rober19_config.resMsg;
    this.validf = false;
    this.errorf = false;
    this.Model_user = new User(
      '',
      '',
      '',
      '',
      '',
      '',
      '',
      '',
      '',
    );
  }



  ngOnInit() {
    if (data_global.UserData.sub != undefined || localStorage.getItem('user')) {
      return this._router.navigate(['/home']);
    }
  }

  onSubmit(form) {
    this.Model_user.role = 'ROLE_USER';
    this.validf = false;
    this.errorf = false;
    this._userService.register(this.Model_user).subscribe(
      res => {
        form.reset();
        swal(`${this.resMsg.RegisterOK}`, "", "success");
      },
      err => {
        swal(`${this.resMsg.RegisterErr}`, "", "error");
      }
    );
  }
}