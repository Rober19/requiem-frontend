import { Component, OnInit } from '@angular/core'

@Component({
  selector: 'Home',
  templateUrl: './home.component.html',  
  styleUrls: ['./home.component.css'],
  providers: []

})

export class HomeComponent implements OnInit{
  public title:string;

  constructor(
    
  ){
    this.title = 'Hub de USUARIO'
  }

  ngOnInit(){
    console.log('HOME - cargado')
  }

}