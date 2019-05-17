import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router';
import { resMsg } from 'rober19-config';
import httpService from '../../services/http.service';
import { data_global } from '../../config/global.config';
import { userService } from '../../services/user.service';
import * as io from 'socket.io-client';
import { User } from '../../models/user';
import { Publication } from '../../models/publication';
import { UploadService } from '../../services/upload.service';
import { Ng2IzitoastService } from 'ng2-izitoast';
import * as iziToast1 from 'izitoast';

//swalComponent es para usar [swal] en el html
import { SwalComponent } from '@toverux/ngx-sweetalert2';

//sweetAlert es la instancia del sweetAlert, no se debe borrar para que swal() funcione
import * as sweetAlert from 'sweetalert';

@Component({
  selector: 'Home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers: [userService, UploadService],
})
export class HomeComponent implements OnInit {
  //public v12 = bcrypt
  private http: httpService = new httpService();
  public userData: any;
  public Counters: any;
  public resMsg: any = resMsg;
  public Publication: Publication;
  public loading: boolean;
  public recentPubs: Array<any>;
  public gif_url_image: String;
  public icons: any;
  public userImageDefault: any = data_global.userImageDefault;
  private izi: any = iziToast1;
  public adminLogged: boolean = data_global.UserData.role == 'ADMIN';
  private socket = io(data_global.url_socket);

  constructor(
    private _userService: userService,
    private _UploadService: UploadService,
    private _router: Router,
    private cdRef: ChangeDetectorRef,
    private iziToast: Ng2IzitoastService,
  ) {
    this.gif_url_image = data_global.loading_animation;
    this.icons = data_global.icons;

    this.Counters = {
      followers: '',
      following: '',
      publications: '',
    };

    this.loading = false;
  }

  ngOnInit() {
    if (!localStorage.getItem('identity')) {
      return this._router.navigate(['/login']);
    } else {
      this.userData = data_global.UserData;

      this.get_pubs();

      this.socket.on('message', data1 => {
        //console.log(data)
        let data: any = data1;

        if (data.user_id != this.userData.sub) return;

        if (data.typeEmit == 'changeImage') {
          var changeData = JSON.parse(localStorage.getItem('user'));
          changeData.image = data.urlImage;
          localStorage.setItem('user', JSON.stringify(changeData));
          this.userData.image = data.urlImage;
        }
      });
      var tokenData = JSON.parse(localStorage.getItem('user'));

      //izitoast
      if (!tokenData.logged_in) {
        this.iziToast.show({
          id: 'show',
          title: 'Hello',
          icon: 'icon-drafts',
          class: 'custom1',
          message: `${tokenData.nick}`,
          position: 'bottomCenter',
          image:
            'https://orig00.deviantart.net/e3b0/f/2015/045/8/8/gwyn_lord_of_the_cinder_by_rck015-d8hytfd.png',
          balloon: true,
        });
        if (data_global.UserData.role == 'ADMIN') {
          this.iziToast.show({
            id: 'haduken',
            theme: 'dark',
            icon: 'icon-contacts',
            title: 'Rober19',
            message: 'Bienvenido ADMIN',
            position: 'bottomCenter',
            transitionIn: 'flipInX',
            transitionOut: 'flipOutX',
            progressBarColor: 'rgb(0, 255, 184)',
            image: data_global.UserData.image,
            imageWidth: 70,
            layout: 2,
            // onClosing: function() {
            //     console.info('onClosing');
            // },
            // onClosed: function(instance, toast, closedBy) {
            //     console.info('Closed | closedBy: ' + closedBy);
            // },
            iconColor: 'rgb(0, 255, 184)',
          });
        }
        tokenData.logged_in = true;
        localStorage.setItem('user', JSON.stringify(tokenData));
      }

      console.log(`HOME ${this.resMsg.loaded}`);
      //aqui ponemos los datos decodificados del token para pintarlos en la vista

      //this.userData.image += '?random+\=' + Math.random();
      if (this.Counters.followers != '') {
      } else {
        this.getCounters(this.userData.sub);
      }
    }
  }

  get_pubs() {
    this._userService.getPublications(data_global.UserData.sub, '1').subscribe(
      data1 => {
        let data: any = data1;
        // let arr1 = this._userService.getPublications(data_global.UserData.sub, data.pages);
        this.recentPubs = data.data;
      },
      err => {
        this.iziToast.error({
          title: 'Error',
          message: `${this.resMsg.serverErr}\n${err}`,
        });
      },
    );
  }

  post_Publication(dataForm) {
    const user = this.userData;
    const publication = dataForm.value.publication;

    this.Publication = new Publication(user.sub, publication, null, '', user);

    // Verificar que la publicación no sea solo espacios en blanco ó "undefined"
    if (!(publication.trim('') === '' || publication === undefined)) {
      this._userService.publication(this.Publication).subscribe(
        data => {
          console.log(data);
          this.get_pubs();
          dataForm.reset();
        },
        err => {
          console.log(err);
        },
      );
    }
  }

  onChange(event) {
    const files = <Array<File>>event.target.files;
    console.log(files);
    if (
      files[0].type != 'image/jpg' &&
      files[0].type != 'image/jpeg' &&
      files[0].type != 'image/png'
    ) {
      return swal(this.resMsg.requiredFile, ``, 'error');
    }
    if (files[0].size > 5 * 1024 * 1024) {
      let size = Math.round(files[0].size / 1024 / 1024);
      return swal(this.resMsg.limit_fileSize, `${size}MB <v> 5MB`, 'error');
    }
    try {
      this.loading = true;
      this._UploadService
        .makeFileRequest(
          `${data_global.url}/upload-image-user`,
          [],
          files,
          this._userService.getIdent_login(),
          'image',
        )
        .then((res: any) => {
          var changeData = JSON.parse(localStorage.getItem('user'));
          changeData.image = res.data.image;
          localStorage.setItem('user', JSON.stringify(changeData));
          this.userData.image = res.data.image;

          this.socket.emit('imageChange', {
            urlImage: this.userData.image,
            typeEmit: 'changeImage',
            user_id: this.userData.sub,
          });

          this.cdRef.detectChanges();

          if (res.status != 200) {
            swal(JSON.stringify(res.status), '', 'error');
            this.loading = false;
          } else {
            this.loading = false;
          }
        });
    } catch (error) {
      this.iziToast.error({
        title: 'Error',
        message: `${this.resMsg.serverErr}`,
      });
    }
  }

  getCounters(id) {
    this._userService.getCounters(id).subscribe(
      data => {
        this.Counters = data;
      },
      err => {
        this.iziToast.error({
          title: 'Error',
          message: `${this.resMsg.serverErr}\n${err}`,
        });
      },
    );
  }

  logOut() {
    localStorage.clear();
    data_global.UserData.sub = undefined;
    this._router.navigate(['/login']);
  }

  setDefaultPic() {
    this.userData.image = this.userImageDefault;
  }

  //funcion para el cred-auth
  async auth(data) {
    const key = data.value.auth;
    data.reset();

    if (key == ('' || null)) return swal(this.resMsg.PasswordErr, '', 'error');

    //toast = request para la respuesta de las credenciales
    this.izi.show({
      id: 'haduken',
      theme: 'light',
      icon: 'icon-contacts',
      displayMode: 2,
      title: `Auth`,
      message: `Peticion Enviada`,
      position: 'topCenter',
      transitionIn: 'flipInX',
      transitionOut: 'flipOutX',
      progressBarColor: 'rgb(0, 255, 184)',
      image: `https://firebase.google.com/_static/images/firebase/touchicon-180.png`,
      imageWidth: 70,
      layout: 2,
      iconColor: 'rgb(0, 255, 184)',
    });

    let res_1 = await this.http.http_get(
      `${data_global.url_firebase_functions}/key_to_credential_compare`,
      new Headers({ pre_key: `${key}` }),
    );

    if (res_1) {
      let res_2 = await this.http.http_get(
        `${data_global.url_firebase_functions}/pass_gen`,
        new Headers({ alt_pass: `${key}` }),
      );

      console.log(res_2);
      swal(res_2.data, res_2._writeTime, 'success');

    } else {
      swal(this.resMsg.PasswordErr, '', 'error');
    }
  }
}
