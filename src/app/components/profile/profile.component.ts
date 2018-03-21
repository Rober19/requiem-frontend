import { Component, OnInit } from '@angular/core'
import { data_global } from '../../services/global'
import { UploadService } from '../../services/upload.service';
import { userService } from '../../services/user.service';
import { resMsg } from '../../config/config'
import * as io from 'socket.io-client';
import { Router } from '@angular/router';
import { User } from '../../models/user';

@Component({
  selector: 'profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
  providers: [UploadService, userService]
})

export class ProfileComponent implements OnInit {

  public userData: any;
  public resMsg: any;
  public upt_button: boolean;
  public filesToUpload: Array<File>;
  //socket = io('http://192.168.1.63:3000');
  constructor(
    private _UploadService: UploadService,
    private _userService: userService,
    private _router: Router
  ) {
    this.resMsg = resMsg;
    this.userData = new User(
      '',
      '',
      '',
      '',
      '',
      '',
      '',
      '',
      '',
    )
  }

  ngOnInit() {


    if (!localStorage.getItem('identity')) {

      return this._router.navigate(['/lobby']);

    } else {

      this.userData = data_global.tokenDecode;      
      this.upt_button = false;
    }


  }
 
  fileChangeEvent(fileInput: any) {

    this.filesToUpload = <Array<File>>fileInput.target.files;
    console.log(this.filesToUpload);
  }

  upt_file() {    
    if (this.filesToUpload == undefined) {
      return window.alert(resMsg.fieldRequired);
    }

    this.upt_button = true;

    try {
      this._UploadService.makeFileRequest(`${data_global.url}/upload-image-user`, [], this.filesToUpload, this._userService.getIdent_login(), 'image').then((res: any) => {


        if (res.status = !200) {
          window.alert(JSON.stringify(res.status));
        } else {
          this._userService.getToken(data_global.tokenDecode.sub).subscribe(
            data => {



              localStorage.setItem('identity', JSON.stringify(data.data));
              this._userService.decodeToken();

              let element = document.getElementById("CloseButton") as any;
              element.click();

              this._router.navigate(['/home']);
            },
            err => {
              console.log(err);
            }
          )
          //localStorage.setItem('identity', JSON.stringify(newToken));

        }



        // this.socket.emit('-myNotification', { option: 'like', message: 'hola' })
        // this.socket.on('-myNotification', (data) => {
        //   console.log(data)        
        // });

      })
    } catch (error) {
      this.upt_button = false;
      console.log('error')
    }



  }

}