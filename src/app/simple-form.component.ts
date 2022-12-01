import { Component } from '@angular/core';
import { TitleService } from './title.service';

@Component({
  selector: 'simple-form',
  templateUrl: './simple-form.component.html',
  styleUrls: ['./simple-form.component.css'],
})
export class SimpleFormComponent {
  public titleListObserv = [{}];
  public results = [];
  public finalTitlesList = [];
  public defaultPerson = [];
  public defaultTitle: String = '';
  public defCounter: number = 0;
  public wrongTitle = true;

  constructor(private titleService: TitleService) {}
  ngOnInit() {
    this.titleService
      .getTitles()
      .subscribe((titles) => (this.titleListObserv = titles));

    for (const [key, value] of Object.entries(this.titleListObserv)) {
      console.log(value);
      for (const [keys, val] of Object.entries(value)) {
        this.results.push(val);
      } }
      console.log(this.results);

      for (var i = 0; i < this.results.length; i += 2) {
        this.finalTitlesList.push(this.results[i]);
        console.log(this.results[i]);
        if (!this.results[i].indexOf("!")) {
          this.finalTitlesList.pop();
          this.finalTitlesList.sort();
        }
 
      }
      for (var i = 1; i < this.results.length; i+= 2) {
        if (this.results[i] === this.wrongTitle) {
          this.defaultTitle = this.results[i-1];
          console.log(this.defaultTitle)
        }        
      }
    }
  }

