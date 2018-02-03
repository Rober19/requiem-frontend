import { Component } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { User } from '../../models/user';
import { userService } from '../../services/user.service';


@Component({
  selector: 'register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  providers: [userService]
})

export class RegisterComponent {
  public header_p1:string;   
  public Model_user:User;
  public a1:string;
  

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _userService: userService
  ){
    this.a1 = "disabled"  
    this.header_p1 = 'ingrese los datos';
    //este seria un objeto usuario
    this.Model_user = new User(
      '',
      '',
      '',
      '',
      '',
      '',
      'ROLE_USER',
      '',
    );
  }

  

  ngOnInit(){
    console.log('')
  }

  onSubmit(form){
    console.log(this.Model_user);    
    this._userService.register(this.Model_user).subscribe(
      res => {
        console.log(res)
        form.reset();
      },
      err => {
        console.warn(err)
      }
    );
  }
}