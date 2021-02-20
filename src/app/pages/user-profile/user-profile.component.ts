import { Component, OnInit } from '@angular/core';
import {UsersService} from '../../services/users.service';
import {User} from '../../models/User';
import {Router} from '@angular/router';
@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {
  // liste des utilisateurs
  user: User = new User();
  ListUsers: User[];
  searchInput;
  listChecked: User[] = [];
  test: User = new User();
  stt = 'Stt';
  constructor(private userService: UsersService, private router: Router) { }

  ngOnInit() {
    this.userService.getAllUsers().subscribe(data => {
      console.log(data);
      this.ListUsers = data;
    }, error => console.log(error)); }
  checkObject(eventObject , liste) {
    if (eventObject.target.checked) {
      console.log('awel select object action');
      this.test = liste;
      this.listChecked.push(liste);
      console.log(this.listChecked);
    }
  }
}
