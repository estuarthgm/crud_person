import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, tap, delay } from 'rxjs/operators';

import { Person } from '../models/Person';

const httpOptions = {
  headers : new HttpHeaders({
    'Content-Type' : 'application/json'
  }) 
};

const url = 'http://localhost:8082/api';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(
    private http : HttpClient
  ) { }

  private handleError<T>( operation = 'operation', result? : T ){
    return ( error : any ) : Observable<T> => {
      console.error(error);  
      return of(result as T);
    }
  }

  getPersons() : Observable<Person[]>{
    const urlL = `${url}/show`;
    return this.http.get<Person[]>(urlL)
    .pipe( delay(300) )
  }

  addPerson( person : Person ) : Observable<Person>{
    const urlA = `${url}/add`;
    return this.http.post<Person>( urlA, person, httpOptions )
  }

  deletePerson( id : string ) : Observable<Person>{
    const urlD = `${url}/delete?id=${id}`;
    return this.http.delete<Person>( urlD, httpOptions )//manejando errores con catchError rxjs
    //.pipe(
      //tap(_ => console.log(`deleted person id = ${id}`)),
      //catchError(this.handleError<Person>('error')) )
  }

  updatePerson( id : string, person : Person ) : Observable<any>{
    const urlU = `${url}/update?id=${id}`;
    return this.http.put( urlU, person, httpOptions )
  }

  getOneById( id : string ) : Observable<Person>{
    const urlO = `${url}/one?id=${id}`;
    return this.http.get<Person>(urlO, httpOptions).pipe(
      delay(200)
    )
  }

}
