import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../auth/auth.service';
import { NgForm } from "@angular/forms"
import { DesktopService } from '../desktop.service';
import { ActivatedRoute, ParamMap } from '@angular/router';

import { Desktop } from '../desktop.model';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss']
})
export class SidenavComponent implements OnInit {

  desktops: Desktop[] = []
  constructor(public desktopService: DesktopService, public route: ActivatedRoute, private authService: AuthService) { }

  ngOnInit() {
    this.desktopService.getDesktops();
    this.desktopService.getDesktopUpdateListener()
    .subscribe((desktops: Desktop[])=>{
      this.desktops = desktops
    });
  };

  onSaveDesktop() {
    // this.isLoading = true;  
    this.desktopService.addDesktop("tempName") 
    // this.isLoading = false;
  }

  onLogout() {
    this.authService.logout();
  }
}
