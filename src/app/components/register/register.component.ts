import { Component } from '@angular/core';

@Component({
  selector: 'register',
  templateUrl: './register.component.html'
})

export class RegisterComponent {
  public header_p1:string;

  constructor(){
    this.header_p1 = 'ingrese los datos';

  }
}