import { Component, OnInit, ChangeDetectorRef } from '@angular/core'
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router'
import * as rober19_config from 'rober19-config/config';
import { data_global } from '../../services/global'
import { userService } from '../../services/user.service';
import * as io from 'socket.io-client';
import { User } from '../../models/user';
import { Publication } from '../../models/publication';
import { UploadService } from '../../services/upload.service';

@Component({
  selector: 'Home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers: [userService, UploadService]
})

export class HomeComponent implements OnInit {

  public title: string;
  public userData: any;
  public Counters: any;
  public resMsg: any;
  public Publication: Publication;
  public loading: boolean;
  public recentPubs: Array<any>;
  public gif_url_image: String;
  public icons: any;
  

  private socket = io(data_global.socket);

  constructor(
    private _userService: userService,
    private _UploadService: UploadService,
    private _router: Router,
    private cdRef: ChangeDetectorRef
  ) {
    
    this.title = 'Hub de USUARIO';
    this.gif_url_image = data_global.loading_animation;
    this.icons = data_global.icons;
    this.Counters = {
      followers: '',
      following: '',
      publications: ''
    };

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
    

    

    this.loading = false;
    this.resMsg = rober19_config.resMsg;
  }

  ngOnInit() {


    if (!localStorage.getItem('identity')) {

      return this._router.navigate(['/login']);

    } else {
      this.userData = data_global.UserData;

      this.get_pubs();

      this.socket.on('message', (data1) => {
        //console.log(data)
        let data: any = data1;
  
        if (data.user_id != this.userData.sub) return;
  
        if (data.typeEmit == 'changeImage') {
          var changeData = JSON.parse(localStorage.getItem('user'));
          changeData.image = data.urlImage;
          localStorage.setItem('user', JSON.stringify(changeData))
          this.userData.image = data.urlImage;
        }
  
      });
      
      if (data_global.UserData.role == 'ADMIN') {
        console.log('$BIEVENIDO ADMIN')
      }

      console.log(`HOME ${this.resMsg.loaded}`)
      //aqui ponemos los datos decodificados del token para pintarlos en la vista
      
      //this.userData.image += '?random+\=' + Math.random();
      if (this.Counters.followers != '') {

      } else {
        this.getCounters(this.userData.sub);
      }



    }
  }

  get_pubs(){
    this._userService.getPublications(data_global.UserData.sub ,'1').subscribe(data1 => {
      let data: any = data1;
      let arr1 = this._userService.getPublications(data_global.UserData.sub, data.pages);
      this.recentPubs = data.data;
      
    },
      err => {
        console.log(err)
      })
  }


  post_Publication(dataForm) {

    const user = this.userData;
    const publication = dataForm.value.publication;

    this.Publication = new Publication(user.sub, publication, null, "", user);

    // Verificar que la publicación no sea solo espacios en blanco ó "undefined"
    if (!(publication.trim("") === "" || publication === undefined)) {
      this._userService.publication(this.Publication).subscribe(
        data => {
          console.log(data);
          this.get_pubs();
          dataForm.reset();
        }, err => {
          console.log(err);
        });
    }
  }

  onChange(event) {
    const files = <Array<File>>event.target.files;
    if (files[0].size > (5 * 1024 * 1024)) {
      return window.alert(this.resMsg.limit_fileSize)
    }
    try {
      this.loading = true;
      this._UploadService.makeFileRequest(`${data_global.url}/upload-image-user`, [], files, this._userService.getIdent_login(), 'image').then((res: any) => {

        var changeData = JSON.parse(localStorage.getItem('user'));
        changeData.image = res.data.image;
        localStorage.setItem('user', JSON.stringify(changeData))
        this.userData.image = res.data.image;

        this.socket.emit('imageChange', {
          urlImage: this.userData.image,
          typeEmit: 'changeImage',
          user_id: this.userData.sub
        });

        this.cdRef.detectChanges();

        if (res.status != 200) {
          window.alert(JSON.stringify(res.status));
          this.loading = false;
        } else {

          this.loading = false;
          //localStorage.setItem('identity', JSON.stringify(newToken));
        }
        // this.socket.emit('-myNotification', { option: 'like', message: 'hola' })
        // this.socket.on('-myNotification', (data) => {
        //   console.log(data)        
        // });
      })

    } catch (error) {
      console.log('error')
    }


  }

  testSocket() {

    this.socket.emit('message', { message: 'frontend' });

  }

  getCounters(id) {
    this._userService.getCounters(id).subscribe(
      data => {
        this.Counters = data;
      },
      err => {
        console.log(err);
      })

  }
  logOut() {
    localStorage.clear();
    data_global.UserData.sub = undefined;
    this._router.navigate(['/lobby']);
  }

}