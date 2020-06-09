import { Component, OnInit } from '@angular/core';
import { bounceOnEnterAnimation } from 'angular-animations';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  animations : [
    bounceOnEnterAnimation({duration:500}),
  ]
})
export class HomeComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
