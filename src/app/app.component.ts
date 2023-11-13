import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'jmbg';
  public jmbg='';
  gerJmbg()
  {
    return this.jmbg;
  }
  setJmbg(value: string): void {
    this.jmbg = value;
  }
}
