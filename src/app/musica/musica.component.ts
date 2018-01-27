import { Component } from '@angular/core';

@Component({
  selector: 'musica',
  template: `    

    <h3 *ngIf="best_song != true" > La Mejor Cancion :{{song_pack.song1}}</h3>
    <h3 *ngIf="best_song"> La Mejor Cancion :{{song_pack.song2}}</h3>

  `
})

export class musicaComp{
  public song1 = 'x & y';
  public song2 = 'amsterdam';
  public best_song = true;

  public song_pack = {
    song1: 'x & y',
    song2: 'amsterdam'
  }
}