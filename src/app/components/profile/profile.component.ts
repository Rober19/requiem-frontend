import { Component, OnInit } from '@angular/core'
import { data_global } from '../../services/global'
import { UploadService } from '../../services/upload.service';
import { userService } from '../../services/user.service';
import { resMsg } from '../../config/config'
import * as io from 'socket.io-client';

@Component({
  selector: 'Profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
  providers: [UploadService, userService]
})

export class ProfileComponent implements OnInit {

  public userData: any;
  public resMsg: any;
  socket = io('http://192.168.1.63:3000');
  constructor(
    private _UploadService: UploadService,
    private _userService: userService
  ) {

  }

  ngOnInit() {
    this.userData = data_global.tokenDecode;
    this.resMsg = resMsg;



  }
  public filesToUpload: Array<File>;
  fileChangeEvent(fileInput: any) {
    this.filesToUpload = <Array<File>>fileInput.target.files;
    console.log(this.filesToUpload);
  }

  upt_file() {
    this._UploadService.makeFileRequest(`${data_global.url}/upload-image-user`, [], this.filesToUpload, this._userService.getIdent_login(), 'image').then((res: any) => {

      console.log(res);    

      this.userData.image += '?random+\=' + Math.random();

      if (res.status =! 200) {
        window.alert(JSON.stringify(res.status));
      }
      
      // this.socket.emit('-myNotification', { option: 'like', message: 'hola' })
      // this.socket.on('-myNotification', (data) => {
      //   console.log(data)        
      // });

    })
  }

}