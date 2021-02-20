import { Component, OnInit } from '@angular/core';
import {User} from '../../models/user';
import {Doctor} from '../../models/doctor';
import {UsersService} from '../../services/users.service';
import {DoctorService} from '../../services/doctor.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-listallres',
  templateUrl: './listallres.component.html',
  styleUrls: ['./listallres.component.css']
})
export class ListallresComponent implements OnInit {
  user: User = new User();
  ListUsers: User[];
  ListUsers2: Doctor[];
  searchInput;
  listChecked: User[] = [];
  test: User = new User();
  iduser: string;
  stt = 'Stt';
  constructor(private userService: UsersService, private doctorService: DoctorService, private router: Router) { }

  ngOnInit() {
     this.userService.getAllUsers().subscribe(data => {
      console.log(data);
      this.ListUsers = data;
    }, error => console.log(error));


    this.iduser = JSON.parse(localStorage.getItem('currentUser')).doc[0]._id;
    console.log('hani panda : ' + this.iduser);
    this.doctorService.UsersByParentId( this.iduser).subscribe(data => {
      console.log(data);
      this.ListUsers2 = data;
    }, error => console.log(error));




  }



}

