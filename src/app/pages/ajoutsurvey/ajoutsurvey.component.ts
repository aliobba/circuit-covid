import { Component, OnInit } from '@angular/core';
import {Doctor} from '../../models/doctor';
import { DoctorService} from '../../services/doctor.service';
import { ActivatedRoute, Router } from '@angular/router';

import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {User} from '../../models/user';
@Component({
  selector: 'app-ajoutsurvey',
  templateUrl: './ajoutsurvey.component.html',
  styleUrls: ['./ajoutsurvey.component.css']
})

export class AjoutsurveyComponent  implements OnInit {
  user: User;
  public copy: string;
  roleuser: any;
  userstorage: string;
  nameusr: string;
  AddForm: FormGroup;
  error = '';
  loading = false;
  submitted: boolean;
  doctor: Doctor;

  constructor(private fb: FormBuilder, private route: ActivatedRoute, private router: Router, private doctorService:  DoctorService) {
    this.user = new User();
  }


  ngOnInit(): void {
    this.userstorage = localStorage.getItem('currentUser');
    this.nameusr = JSON.parse(this.userstorage).user.name;
    console.log('ineshani fil icons', this.nameusr);
    this.createForm();
  }

  createForm() {
    this.AddForm = this.fb.group({
      nom: ['', Validators.required],
      prenom: ['', Validators.required],
      username: ['', Validators.required],
      pwd: ['', Validators.required],
    });
  }
  get f() { return this.AddForm.controls; }

  ajouter() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.AddForm.invalid) {
      return;
    }

    this.loading = true;
    this.doctorService.createTel(this.f.nom.value, this.f.prenom.value, this.f.username.value, this.f.pwd.value)
      .subscribe( data => {
        console.log('mppmmp' + data );
        alert(' l\'utilisateur :' + this.user.name + ' a été ajouté avec succès . '  + '. Rôle : ' + this.user.role + '.');
        this.router.navigate(['/dashboard']);
      });

  }

}


