import { Component, OnInit } from '@angular/core';
import { Router, NavigationStart, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.css']
})
export class LoaderComponent implements OnInit {

  show = false;
  constructor(
    private router : Router
  ) { }

  ngOnInit(): void {
    this.router.events.subscribe(event => {
      if(event instanceof NavigationStart){
        this.show = true;
      }else if(event instanceof NavigationEnd){
        this.show = false;
      }
    })
  }

}
