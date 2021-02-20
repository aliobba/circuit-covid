import { Component, OnInit } from '@angular/core';
import {User} from '../../models/user';
import {ActivatedRoute, Router} from '@angular/router';
import {UsersService} from '../../services/users.service';

@Component({
  selector: 'app-manageprofil',
  templateUrl: './manageprofil.component.html',
  styleUrls: ['./manageprofil.component.css']
})
export class ManageprofilComponent implements OnInit {
  // changer mot de passe
  user: User;
  public copy: string;
  userstorage: string;
  iduser: string;

  constructor(private route: ActivatedRoute, private router: Router, private userService:  UsersService) {
    this.user = new User();
  }
  ngOnInit(): void {
    this.userstorage = localStorage.getItem('currentUser');
    console.log('password', JSON.parse(this.userstorage).user._id);
    this.iduser = JSON.parse(this.userstorage).user._id;
    console.log('hani jit', this.iduser);
  }
  update(): void {
    console.log('ines hani 5lat', this.iduser);
    console.log('ines hani jebt pwd', this.user.pwd);
    console.log('ines hani jebt pwd2', this.user.newpwd);
    console.log('ines hani jebt pwd3', this.user.confpwd);
    if (this.user.newpwd === this.user.confpwd) {
      console.log('5lat ya inessss');
      this.userService.updatePwd(this.iduser, this.user.pwd, this.user.newpwd, this.user.confpwd).subscribe(data => {
        this.router.navigate(['/dashboard']);
     });
    }
  }

}
