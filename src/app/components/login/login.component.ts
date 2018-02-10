import { Component, OnInit } from '@angular/core';
import { resMsg } from '../../config/config'
import { User } from '../../models/user';
import { userService } from '../../services/user.service'
import { JwtHelper } from 'angular2-jwt'
import { Router, ActivatedRoute, Params } from '@angular/router';
import { tokenKey } from '@angular/core/src/view/util';

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [userService, JwtHelper]
})

export class LoginComponent implements OnInit{
  private title:string;
  //creamos una variable vacia para instanciar CONFIG
  private config:any;
  //creamos una variable de tipo USER sin darle los valores
  private login_user: User;
  //esta variable guardará el usuario logueado
  private identLogin;
  //esta variable guardará el token del usuario
  private tokenLogin;
  //esta variable validara la entrada del usuario
  private valid:boolean;
  private msgRes:string;

  constructor(
    private userService:userService,
    private _route: ActivatedRoute,
    private _router: Router,
    private jwt: JwtHelper   
    
  ){
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
    
  }

  ngOnInit(){

    if (this.userService.getIdent_login() != null) {
      console.log(this.userService.getIdent_login());
      this._router.navigate(['/home']);      

    }
    console.log('componente cargado');
  }

  prueba(){
    console.log(this.login_user);    
  }

  sendLogin(){
    this.userService.login(this.login_user, 'true').subscribe(
      res => {
        //esta variable tendra los datos del usuario obtenido          
        this.tokenLogin = res.data;
        
        //'secret_token_summertime_sadness'        
        console.log(this.jwt.decodeToken(res.data));

        localStorage.setItem('identity', JSON.stringify(this.tokenLogin));
        
        this._router.navigate(['/home']);
        
        
      },
      err => {
        console.warn(err.error.data);
        this.valid = true;
        this.msgRes = err.error.data;
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