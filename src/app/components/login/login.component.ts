import { Component, OnInit } from '@angular/core';
import { resMsg } from '../../config/config'
import { User } from '../../models/user';
import { userService } from '../../services/user.service'
import { Router, ActivatedRoute, Params } from '@angular/router';
import { tokenKey } from '@angular/core/src/view/util';
import { data_global } from '../../services/global'
import * as $ from 'jquery';

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [userService]
})

export class LoginComponent implements OnInit {
  public title: string;
  //creamos una variable vacia para instanciar CONFIG
  public config: any;
  //creamos una variable de tipo USER sin darle los valores
  public login_user: User;
  //esta variable guardará el usuario logueado
  public identLogin;
  //esta variable guardará el token del usuario
  public tokenLogin;
  //esta variable validara la entrada del usuario
  public valid: boolean;

  public resMsg: any;
  public resServer: any;


  constructor(
    private userService: userService,
    private _route: ActivatedRoute,
    private _router: Router
  ) {
    this.title = 'ingrese su indetificacion';
    //esta es la instancia de CONFIG
    this.config = resMsg;
    //aqui está el objeto Usuario, del cual solo usaremos su EMAIL y PASSWORD
    this.login_user = new User(
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

    this.valid = false;
    this.resMsg = resMsg;

  }

  ngOnInit() {


    if (data_global.UserData.sub != undefined || localStorage.getItem('identity')) {
      return this._router.navigate(['/home']);
    }

    console.log(`LOGIN ${resMsg.loaded}`);
  }

  test() {

  }

  sendLogin() {
    this.valid = false;
    this.userService.login(this.login_user).subscribe(
      res => {

        //'secret_token_summertime_sadness' 
        localStorage.setItem('user', JSON.stringify(res.data));
         data_global.UserData = JSON.parse(localStorage.getItem('user'));
         data_global.UserData.sub = res.data._id;


        this.userService.login(this.login_user, 'true').subscribe(
          res => {
            let element = document.getElementById("CloseButton") as any;
            element.click();
            //esta variable tendra los datos del usuario obtenido          
            this.tokenLogin = res.data;
    
            //'secret_token_summertime_sadness' 
            localStorage.setItem('identity', JSON.stringify(this.tokenLogin));            
            this._router.navigate(['/home']);
          },
          err => {
            this.valid = false;
            let element = document.getElementById("CloseButton") as any;
            setTimeout(() => {
              element.click();
              this.valid = true;
            }, 500);        
            console.warn(err.error.data);    
            this.resServer = resMsg.userNotFound;           
            
          }
        )
        
      },
      err => {
        this.valid = false;
        let element = document.getElementById("CloseButton") as any;
        setTimeout(() => {
          element.click();
          this.valid = true;
        }, 500);        
        console.warn(err.error.data);    
        this.resServer = resMsg.userNotFound;
       
        
      }
    )
  }



  //aqui recibimos el token del usuario
  // Token(){
  //   this.userService.login(this.login_user, 'true').subscribe(
  //     res => {

  //       this.tokenLogin = res.data;

  //       console.log(res);
  //       //'secret_token_summertime_sadness'        
  //       console.log(this.jwt.decodeToken(res.data));

  //       localStorage.setItem('identity', JSON.stringify(this.tokenLogin));


  //     },
  //     err => {
  //       console.warn(err.error.data);
  //     }
  //   )
  // }

}