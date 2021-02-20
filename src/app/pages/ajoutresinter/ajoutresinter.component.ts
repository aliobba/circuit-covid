import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {DoctorService} from '../../services/doctor.service';
import {Doctor} from '../../models/doctor';

@Component({
  selector: 'app-ajoutresinter',
  templateUrl: './ajoutresinter.component.html',
  styleUrls: ['./ajoutresinter.component.css']
})
export class AjoutresinterComponent implements OnInit {
  roleuser: any;
  userstorage: string;
  rolecurr: string;

  doctor: Doctor;
  public copy: string;
  AddForm: FormGroup;
  error = '';
  loading = false;
  submitted: boolean;
  constructor(private fb: FormBuilder, private route: ActivatedRoute, private router: Router, private doctorService:  DoctorService) {



    this.userstorage = localStorage.getItem('currentUser');
    this.roleuser  = JSON.stringify(JSON.parse(this.userstorage).user.role);
    console.log('avant', JSON.parse(this.userstorage).user.role);
    console.log('hani hné' , this.roleuser);
    this.rolecurr = JSON.parse(this.userstorage).user.role;

  }

  ngOnInit(): void {

    this.createForm();
  }

  createForm() {
    this.AddForm = this.fb.group({
      nom: ['', [Validators.required]],
      prenom: ['', [Validators.required]],
      username: ['', [Validators.required]],
      pwd: ['', [Validators.required]],
      rl: ['', [Validators.required]],
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
    this.doctorService.createDoctor(this.f.nom.value, this.f.prenom.value, this.f.username.value, this.f.pwd.value, this.f.rl.value)
      .subscribe( data => {
        this.router.navigate(['/dashboard']);
        },
        error => {
          this.error = error;
          this.loading = false;
        });

  }

}

