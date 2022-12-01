import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
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
  public titleOptions: any[];
  public wrongTitle = true;

  public userForm: FormGroup;
  public userFirstName = "";
  public userLastName: any = "";
  public userTitle = "";
  public acceptedTerms = "";
  public selectedOptions = "";
  public lastNameMandatory: any;
  
  public submitedForm: boolean = false;

  constructor(private titleService: TitleService, private fb: FormBuilder) {
    this.userForm = this.fb.group({
      userTitle: "",
      userFirstName: "",
      userLastName: "",
      acceptedTerms: "",
    })
  }
  ngOnInit() {

    this.lastNameMandatory = new FormControl(this.userForm.get("userLastName").value, 
      Validators.required);
      console.log(this.lastNameMandatory)

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

      onSubmit(formData) {
        
        this.userTitle = formData.userTitle;
        this.userFirstName = this.userForm.get("userFirstName")?.value;
        this.userLastName = this.userForm.get("userLastName")?.value;
        this.acceptedTerms = this.userForm.get("acceptedTerms").value ? this.userForm.get("acceptedTerms")?.value : false ;
        console.log("User title: " + (this.userTitle ? this.userTitle : this.defaultTitle) + "\n" + "User First Name: " + (this.userFirstName ? this.userFirstName : " Empty") + "\n" + "User Last Name: " + this.userLastName + "\n" + "Accepter Terms: " + this.acceptedTerms);
        this.submitedForm = true;



      }

      test() {
        this.lastNameMandatory = new FormControl(this.userForm.get("userLastName").value, 
      Validators.required);
      console.log(this.lastNameMandatory.pristine)
      }
  
  }

