import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, NgForm } from '@angular/forms';
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

  public userForm: FormGroup;
  public userFirstName = "";
  public userLastName = "";
  public userTitle = "";
  public acceptedTerms = "";

  constructor(private titleService: TitleService, private fb: FormBuilder) {
    this.userForm = this.fb.group({
      userTitle: "",
      userFirstName: "",
      userLastName: "",
      acceptedTerms: ""
    })
  }
  ngOnInit() {

    // this.formData = new FormGroup({
    //   userTitle: new FormControl(),
    //   userFirstName: new FormControl(),
    //   userLastName: new FormControl(),
    //   acceptedTerms: new FormControl()
    // })

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
        if (!this.results[i].indexOf("!")) {
          this.finalTitlesList.pop();
        }
        this.finalTitlesList.sort();
      }
      for (var i = 1; i < this.results.length; i+= 2) {
        if (this.results[i] === this.wrongTitle) {
          this.defaultTitle = this.results[i-1];
        }        
      }
    }

    onSubmit() {
      this.userFirstName = this.userForm.get("userFirstName")?.value;
      console.log(this.userFirstName);
    }
  }

