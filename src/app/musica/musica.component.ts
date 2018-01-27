import { Component } from '@angular/core';

@Component({
  selector: 'musica',
  template: `
    <h2> {{song}} </h2>
  `
})

export class musicaComp{
  public song = 'x & y';
}