import { Component, OnInit, ViewChild, Inject } from '@angular/core';

import { ApiService } from '../../services/api.service';
import { Person } from 'src/app/models/Person';

import { MatSnackBar } from '@angular/material/snack-bar'; 
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { ActivatedRoute, Router } from '@angular/router';
import { bounceOnEnterAnimation } from 'angular-animations';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css'],
  animations : [bounceOnEnterAnimation({duration:500})]
})
export class ListComponent implements OnInit {
  display : string[] = [ 'id', 'name', 'lastName', 'birthday', 'bu', 'bd' ];
  dataSource : Person[] = [];
  tableSource;
  duration = 2;

  @ViewChild(MatSort, {static: true}) sort: MatSort;

  constructor(
    private api : ApiService,
    private snack : MatSnackBar,
    private route : ActivatedRoute,
    private router : Router
  ) { }

  ngOnInit(): void {
    this.getPersons();
  }

  getPersons(){
    this.dataSource = this.route.snapshot.data.persons;
    this.tableSource = new MatTableDataSource(this.dataSource);
  }

  getPersonsLazzy(){
    this.api.getPersons().subscribe( res => {
      this.dataSource = res;
      this.tableSource = new MatTableDataSource(this.dataSource);
    }, err => {
      console.log(err);
    })
  }


  delete( id : string ){
    this.api.deletePerson(id).subscribe((res : any) => {
      this.getPersonsLazzy();
      this.openSnack();
    }, err => {
      console.log(err);
    })
  }

  openSnack(){
    this.snack.openFromComponent(Snack, {
      duration : this.duration *1000
    })
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.tableSource.filter = filterValue.trim().toLowerCase();
  }

}

@Component({
  selector: 'snack',
  template: `<span>Eliminado exitosamente</span>`})
export class Snack {}