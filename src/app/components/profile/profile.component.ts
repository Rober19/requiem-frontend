import { Component, OnInit } from '@angular/core'
import { data_global } from '../../services/global'
import { UploadService } from '../../services/upload.service';
import { userService } from '../../services/user.service';
import { resMsg } from 'rober19-config/config';
import * as io from 'socket.io-client';
import { Router, ActivatedRoute } from '@angular/router';
import { User } from '../../models/user';
import { Publication } from '../../models/publication';

@Component({
  selector: 'profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
  providers: [UploadService, userService]
})

export class ProfileComponent implements OnInit {

  public userData: any;
  public Publication: any;
  public resMsg: any;
  public userCounters: any;
  public upt_button: boolean;
  public filesToUpload: Array<File>;
  public recentPubs: Array<any>;

  //socket = io('http://192.168.1.63:3000');
  constructor(
    private _UploadService: UploadService,
    private _userService: userService,
    private _router: Router,
    private ActiveRoute: ActivatedRoute
  ) {
    this.userCounters = {
      
    }
    this.ActiveRoute.params.subscribe(params => {      
      this._userService.getUser(params.id).subscribe(
        data1 => {
          let data : any = data1;        
          this.userData = data.data.data;
          this.get_pubs(data.data.data._id);
          this._userService.getCounters(data.data.data._id).subscribe(data => {                       
            this.userCounters = data;
            console.log(this.userCounters)
          })
        },
        err => {
          console.log(err.error);
          console.log('abre el ojo')
        }
      )
    });
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
    this.Publication = new Publication(
      '',
      '',
      '',
      '',
      ''
    );
  }

  ngOnInit() {

   


    if (!localStorage.getItem('identity')) {

      return this._router.navigate(['/lobby']);

    } else {

      

    }


  }

  fileChangeEventNOUSAR(fileInput: any) {

    this.filesToUpload = <Array<File>>fileInput.target.files;
    console.log(this.filesToUpload);
  }


  post_Publication() {
    this.Publication.text = 'holaa';
    this._userService.publication(this.Publication).subscribe(
      data => {
        console.log(data);
      }, err => {
        console.log(err);
      });
  }

  get_Publication() {
    console.log(data_global.UserData.sub)
    this._userService.getPublications(this.userData.sub, 1).subscribe(
      data => {
        console.log(data);
      }, err => {
        console.log(err);
      });
  }

  get_pubs(userId, ){
    this._userService.getPublications(userId, '1').subscribe(data1 => {
      let data: any = data1;
      let arr1 = this._userService.getPublications(userId, data.pages);
      this.recentPubs = data.data;
      console.log(this.recentPubs)
    },
      err => {
        console.log(err)
      })
  }

}