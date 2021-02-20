import { Component, OnInit } from '@angular/core';
import {Doctor} from '../../models/doctor';
import { DoctorService} from '../../services/doctor.service';
import { ActivatedRoute, Router } from '@angular/router';

import {FormBuilder, FormGroup, Validators} from '@angular/forms';
@Component({
  selector: 'app-ajoutchefservice',
  templateUrl: './ajoutchefservice.component.html',
  styleUrls: ['./ajoutchefservice.component.css']
})
export class AjoutchefserviceComponent  implements OnInit {
  doctor: Doctor;
  public copy: string;
  AddForm: FormGroup;
  error = '';
  loading = false;
  submitted: boolean;
  constructor(private fb: FormBuilder, private route: ActivatedRoute, private router: Router, private doctorService:  DoctorService) {

  }


  ngOnInit(): void {
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
    this.doctorService.createChef(this.f.nom.value, this.f.prenom.value, this.f.username.value, this.f.pwd.value)
      .subscribe( data => {
        this.router.navigate(['/dashboard']);
      });

  }

}

