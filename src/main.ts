import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

if (environment.production) {
  enableProdMode();
}

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.log(err));

  setInterval(() => {
    fetch('https://backend-mean5-project.herokuapp.com/app/get')
      .then(function (response) {
        return response.json();
      })
      .then(function (myJson) {
        console.log(`${myJson} (Wake Up [Server])`);
      });
  
  }, 300000)
   