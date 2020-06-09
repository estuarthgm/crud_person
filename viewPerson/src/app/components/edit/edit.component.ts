import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';

import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { bounceOnEnterAnimation } from 'angular-animations';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css'],
  animations : [bounceOnEnterAnimation({duration:500})]
})
export class EditComponent implements OnInit {

  id;
  name : '';
  nameFetched : '';
  lastName : '';
  lastNameFetched : '';
  birthday : '';
  personForm : FormGroup;
  duration = 2;

  constructor(
    private api : ApiService,
    private route : ActivatedRoute,
    private router : Router,
    private formBuilder : FormBuilder,
    private snack : MatSnackBar, 
  ) { }

  ngOnInit(): void {
    this.nameFetched = this.route.snapshot.data.person.name;
    this.lastNameFetched = this.route.snapshot.data.person.lastName;
    this.id = this.route.snapshot.paramMap.get('id');
    this.personForm = this.formBuilder.group({
      name : [this.nameFetched, Validators.required],
      lastName : [this.lastNameFetched, Validators.required]
    })
  }

  onFormSubmit(){
    this.api.updatePerson(this.id, this.personForm.value).subscribe((res : any) => {
      this.router.navigate(['/list']);
      this.snack.openFromComponent(Snack, { duration : this.duration * 2000 });
    }, err => { console.log(err); })
  }
  
}

@Component({
  selector: 'snack',
  template: `<span>Persona editada exitosamente</span>`})
export class Snack {}

