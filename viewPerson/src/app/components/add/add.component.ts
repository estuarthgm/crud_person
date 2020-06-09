import { Component, OnInit, OnChanges } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { FormBuilder, FormGroup,Validators, Form } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { bounceOnEnterAnimation } from 'angular-animations';


@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css'],
  animations : [
    bounceOnEnterAnimation({duration:500}),
  ]
})
export class AddComponent implements OnInit{

  personForm : FormGroup;
  idStep : FormGroup;
  nameStep : FormGroup;
  lastNameStep : FormGroup;
  birthdayStep : FormGroup;
  id : '';
  name : '';
  lastName : '';
  birthday : '';
  duration = 2;
  errString;
  minDate = new Date(1800, 3, 10);
  maxDate = new Date();
  num = false;

  constructor(
    private api : ApiService,
    private router : Router,
    private snack : MatSnackBar,
    private formBuilder: FormBuilder,
  ) { }

  ngOnInit(): void {
    this.idStep = this.formBuilder.group({ id : [null, Validators.required] })

    this.nameStep = this.formBuilder.group({ name : [null, Validators.required] })

    this.lastNameStep = this.formBuilder.group({ lastName : [null, Validators.required] })

    this.birthdayStep = this.formBuilder.group({ birthday : [null, Validators.required] })
    
    this.personForm = this.formBuilder.group({
      id : [null, Validators.required],
      name : [null, Validators.required],
      lastName : [null, Validators.required],
      birthday : [null, Validators.required]
    })
    this.personForm.get('id').disable();
    this.personForm.get('name').disable();
    this.personForm.get('lastName').disable();
    this.personForm.get('birthday').disable();
  }

  onKeyId( event : any ){
    this.id = this.idStep.get('id').value;
    this.personForm.get('id').setValue(this.id);
    if( event.target.value >= 10000 ){
      this.idStep.get('id').setValue(99999);
      this.personForm.get('id').setValue(99999);
    }
  }

  onKeyName( event : any ){
    this.name = this.nameStep.get('name').value;
    this.personForm.get('name').setValue(this.name);
  }

  onKeyLast( event : any ){
    this.lastName = this.lastNameStep.get('lastName').value;
    this.personForm.get('lastName').setValue(this.lastName);
  }

  onKeyBirthday( event : any ){
    this.birthday = this.birthdayStep.get('birthday').value;
    this.personForm.get('birthday').setValue(this.birthday);
  }

  onFormSubmit(){
    this.api.addPerson(this.personForm.value).subscribe((res : any) => {
      
      this.router.navigate(['/list']);
      this.openSnack();
    
    }, ( err : HttpErrorResponse ) => {
      
      this.errString = err.error;

      if( this.errString == "All the arguments are required" ) {
        this.openDataErrorSnack();

      }else if( this.errString == "This id is already on the db" ) {
        this.openErrorIdSnack();
      }
    })
  }

  openSnack(){
    this.snack.openFromComponent(Snack, { duration : this.duration *1000 })
  }

  openErrorIdSnack(){
    this.snack.openFromComponent(SnackIdError, { duration: this.duration *2000 })
  }

  openDataErrorSnack(){
    this.snack.openFromComponent(SnackDataError, { duration: this.duration *2000 })
  }

}

@Component({
  selector: 'snack',
  template: `<span>Agregado exitosamente</span>`})
export class Snack {}

@Component({
  selector: 'snack_id_error',
  template: `<span>Este ID Ya existe en la base de datos, ingrese otro</span>`})
export class SnackIdError {}

@Component({
  selector: 'snack_data_error',
  template: `<span>Todos los campos son necesarios para crear una persona</span>`})
export class SnackDataError {}
