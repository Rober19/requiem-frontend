import { Component } from '@angular/core';

@Component({
  selector: 'musica',
  templateUrl: './musica.components.html'
})

export class musicaComp{
  public song1:string;
  public song2:string;
  public best_song:Boolean; 

  public song_pack = {
    song1: 'x & y',
    song2: 'amsterdam'
  }

  public pack:Array<string>;

  constructor(){
    this.song1 = 'Warning Sign';
    this.song2 = 'Hardest Part';
    this.best_song = false;
    this.pack = [
      '2',
      '45',
      '34',
      '235'
    ]
  }
}