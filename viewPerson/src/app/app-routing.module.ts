import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { ListComponent } from './components/list/list.component';
import { AddComponent } from './components/add/add.component';
import { EditComponent } from './components/edit/edit.component';
import { PersonResolver, GetPersonResolver } from './resolvers/person.resolver';


const routes: Routes = [
  { path : 'welcome', component : HomeComponent },
  { path : 'list', component : ListComponent, resolve : { persons : GetPersonResolver } },
  { path : 'add', component : AddComponent},
  { path : 'edit/:id', component : EditComponent, resolve : { person : PersonResolver} },
  { path : '', redirectTo : '/welcome', pathMatch : 'full' },
  { path : '**', redirectTo : '/welcome', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
