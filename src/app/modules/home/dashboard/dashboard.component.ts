import { Component, OnInit, QueryList, ViewChild, ViewChildren } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  

  videoSource = "https://ifamygate-floatingcity.s3.me-south-1.amazonaws.com/information/FC-Walkthrough.mov"

  ngOnInit() {

  }

  constructor() {
    
  }

}
