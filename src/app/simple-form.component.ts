import { Component } from '@angular/core';
import { TitleService } from './title.service';


@Component({
  selector: 'simple-form',
  templateUrl: './simple-form.component.html',
  styleUrls: ['./simple-form.component.css']
})


export class SimpleFormComponent {
  public tr = 'esss';

  constructor(private titleService: TitleService) {
  }
  ngOnInit() {
    console.log("HI");
  }
   public tests(event) {
    console.log("dddddd" + event);
    console.log("dddddd");
    console.log("dddddd");
    console.log("dddddd");
    console.log("dddddd");
    console.log("dddddd");
  }

}

