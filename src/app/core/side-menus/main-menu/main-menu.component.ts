import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-main-menu',
  templateUrl: './main-menu.component.html',
  styleUrls: [
    './styles/main-menu.component.scss'
  ]
})
export class MainMenuComponent implements OnInit {

  uC = JSON.parse(localStorage.getItem('userclass'));
  showCRM = false;
  showVoting = false;

  constructor() {
    if (this.uC === 1) {
      this.showCRM = true;
    } else {
      this.showVoting = true;
    }
  }

  ngOnInit() {
  }

}
