import { Component, OnInit, ElementRef } from '@angular/core';
import { ROUTES } from '../sidebar/sidebar.component';
import { Location, LocationStrategy, PathLocationStrategy } from '@angular/common';
import { Router } from '@angular/router';
import {User} from '../../models/User';
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  public focus;
  userstorage: string;
  usercon: string;
  role: string;

  roleBoolean = false;
  user: User = new User();
  public listTitles: any[];
  public location: Location;
  constructor(location: Location,  private element: ElementRef, private router: Router) {
    this.location = location;
  }

  ngOnInit() {
    this.userstorage = localStorage.getItem('currentUser');
    this.listTitles = ROUTES.filter(listTitle => listTitle);
    this.usercon = JSON.parse(this.userstorage).user.user;

  }
  logout() {
    localStorage.removeItem('user');
    localStorage.clear();
    this.router.navigate(['/login']);
  }


}
