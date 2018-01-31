import { Component } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router'
import { User } from '../../models/user';



@Component({
  selector: 'register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})

export class RegisterComponent {
  public header_p1:string;   
  public Model_user:User;
  public a1:string;

  constructor(
    private _route: ActivatedRoute,
    private _router: Router
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

  onSubmit(){
    console.log(this.Model_user);    
  }
}