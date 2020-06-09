import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Person } from '../models/Person';
import { ApiService } from '../services/api.service';


@Injectable({
    providedIn: 'root'
})

export class PersonResolver implements Resolve<Observable<Person>>{
    constructor( private api : ApiService ){}
    resolve( route : ActivatedRouteSnapshot ){
        return this.api.getOneById(route.paramMap.get('id'));
    }
}

@Injectable({
    providedIn: 'root'
})
export class GetPersonResolver implements Resolve<Observable<Person[]>>{
    persons : Observable<Person[]>;
    constructor( private api : ApiService){}
    resolve(){
        this.persons = this.api.getPersons();
        return this.persons;
    }
}