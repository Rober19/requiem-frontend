import { Component, OnInit } from '@angular/core'

@Component({
  selector: 'lobby',
  templateUrl: './lobby.component.html',
  styleUrls: ['./lobby.component.css'],
  providers: []
})

export class LobbyComponent{

public palo:Array<number>;

  ngOnInit(){
    this.palo = [1,2,3,4];
    console.log('LOBBY - cargado')
  }

}