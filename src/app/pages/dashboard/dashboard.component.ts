import { Component, OnInit , ViewEncapsulation} from '@angular/core';


import {Doctor} from '../../models/doctor';
import {DoctorService} from '../../services/doctor.service';
import {User} from '../../models/user';
import {Patient} from '../../models/patient';
import {UsersService} from '../../services/users.service';
import {PatientService} from '../../services/patient.service';
import {Router} from '@angular/router';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  user: User = new User();
  ListUsers: User[];
  ListDoctor: Doctor[];
  Listpatient: Patient[];
  closeResult: string;
  roleuser: any;
  userstorage: string;
  rolecurr: string;
  rolecurr2: string;
  // tslint:disable-next-line:max-line-length
  constructor( private userService: UsersService, private doctorService: DoctorService, private patientService: PatientService, private router: Router) { }



  ngOnInit() {
    this.userstorage = localStorage.getItem('currentUser');
    this.roleuser  = JSON.stringify(JSON.parse(this.userstorage).user.role);
    console.log('avant', JSON.parse(this.userstorage).user.role);
    console.log('hani hné' , this.roleuser);

    this.rolecurr = JSON.parse(this.userstorage).user.role;
    this.rolecurr2 = JSON.parse(this.userstorage).user.name;

    console.log('dash', localStorage);


  }
}
