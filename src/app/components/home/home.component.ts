import { Component, OnInit } from '@angular/core'
import { JwtHelper } from 'angular2-jwt'
import { Router } from '@angular/router'

import { data_global } from '../../services/global'
import { userService } from '../../services/user.service';

@Component({
  selector: 'Home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers: [JwtHelper]

})

export class HomeComponent implements OnInit {
  public title: string;
  public userData: any;
  public Counters: any;
  constructor(
    private jwt: JwtHelper,
    private _router: Router,
    private userService: userService
  ) {
    this.title = 'Hub de USUARIO'
  }

  ngOnInit() {
    if (!localStorage.getItem('identity')) {

      return this._router.navigate(['/lobby']);

    } else {
      console.log('HOME - cargado')
      //aqui ponemos los datos decodificados del token para pintarlos en la vista
      this.userData = data_global.tokenDecode;
      this.getCounters(this.userData.sub);

      ;
    }



  }
  getCounters(id) {
    this.userService.getCounters(id).subscribe(
      data => {
        this.Counters = data;
      },
      err => {
        console.log(err);
      })

  }
  logOut() {
    localStorage.clear();
    data_global.tokenDecode = {
      sub: undefined
    };
    this._router.navigate(['/lobby']);

  }

}