import { Component, OnInit, HostBinding } from '@angular/core';
import { SideMenusService } from '../side-menus.service';
import { Subscription, timer } from 'rxjs';  
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';

@Component({
  selector: 'app-notifications-menu',
  templateUrl: './notifications-menu.component.html',
  styleUrls: ['./notifications-menu.component.scss']
})
export class NotificationsMenuComponent implements OnInit {
  @HostBinding('class.actions-on-top') topActions = true;

  

  constructor(private sideMenusService: SideMenusService,   private router: Router) { 
    
  }

  ngOnInit() {
    
  }


  closeAltMenu(): void {
    this.sideMenusService.toggleAltMenuSubject.next('close');
  }


}
