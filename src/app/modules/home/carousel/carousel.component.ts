import { Component, OnInit, Input } from '@angular/core';
import { trigger, transition, useAnimation } from "@angular/animations";
import { fadeIn, fadeOut, scaleIn, scaleOut } from "./carousel.animations";
import { Subscription, timer } from 'rxjs';  
import { map } from 'rxjs/operators';

@Component({
  selector: 'carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.scss'],
  animations: [
    trigger("carouselAnimation", [
      /* scale */
      transition("void => *", [useAnimation(fadeIn, {params: { time: '500ms' }} )]),
      transition("* => void", [useAnimation(fadeOut, {params: { time: '500ms' }})]),
    ])
  ]
})
export class CarouselComponent implements OnInit {
  @Input() slides;

  currentSlide = 0;

  timerSubscription: Subscription; 

  constructor() {}

  onPreviousClick() {
    const previous = this.currentSlide - 1;
    this.currentSlide = previous < 0 ? this.slides.length - 1 : previous;
    //console.log("previous clicked, new current slide is: ", this.currentSlide);
  }

  onNextClick() {
    const next = this.currentSlide + 1;
    this.currentSlide = next === this.slides.length ? 0 : next;
    //console.log("next clicked, new current slide is: ", this.currentSlide);
  }

  ngOnInit() {
    this.timerSubscription = timer(0, 5000).pipe( 
      map(() => { 
        this.onNextClick()
      }) 
    ).subscribe(); 
  }

}
