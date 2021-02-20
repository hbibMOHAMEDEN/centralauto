import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';

@Component({
  selector: 'app-sign-base-view',
  templateUrl: './sign-base-view.component.html',
  styleUrls: ['./sign-base-view.component.css']
})
export class SignBaseViewComponent implements OnInit {
    title: string;
    type;

  constructor(private location : Location) { }

  ngOnInit(): void {
    this.getPath();
  }
  getPath(){
    const path = this.location.prepareExternalUrl(this.location.path()).slice(1);
    if(path === '/signin'){
      this.title = "CONNEXION";
      this.type = 'signin';
    } else if (path === '/signup'){
      this.title = "INSCRIPTION";
      this.type = 'signup';
    }
  }
}
