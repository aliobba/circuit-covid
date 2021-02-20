import { Component, OnInit } from '@angular/core';
import {User} from '../../models/user';
import {UsersService} from '../../services/users.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-listallintern',
  templateUrl: './listallintern.component.html',
  styleUrls: ['./listallintern.component.css']
})
export class ListallinternComponent implements OnInit {
  user: User = new User();
  ListUsers: User[];
  searchInput;
  listChecked: User[] = [];
  test: User = new User();
  stt = 'Stt';
  constructor(private userService: UsersService, private router: Router) { }

  ngOnInit() {
    /*   this.userService.getAllUsers().subscribe(data => {
      console.log(data);
      this.ListUsers = data;
    }, error => console.log(error));
*/  }
}
