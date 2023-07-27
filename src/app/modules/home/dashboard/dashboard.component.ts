import { Component, OnInit, QueryList, ViewChild, ViewChildren } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  
  public slides = [
    { src: "https://ifaqtworks-akpacific.s3.me-south-1.amazonaws.com/images/akpacific.jpg" },
    { src: "https://ifaqtworks-akpacific.s3.me-south-1.amazonaws.com/images/image005.png" },
    { src: "https://ifaqtworks-akpacific.s3.me-south-1.amazonaws.com/images/imgNaN.png" },
  ];

  videoSource = "https://ifaqtworks-akpacific.s3.me-south-1.amazonaws.com/info/QTWorks-AKPacific.mov"

  ngOnInit() {

  }

  constructor() {
    
  }

}
