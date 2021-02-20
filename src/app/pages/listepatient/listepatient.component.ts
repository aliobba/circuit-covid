import { Component, OnInit } from '@angular/core';

import {User} from '../../models/user';
import {Patient} from '../../models/patient';
import {UsersService} from '../../services/users.service';
import {PatientService} from '../../services/patient.service';
import {ActivatedRoute, Router} from '@angular/router';
import {map} from 'rxjs/operators';
import {Observable} from 'rxjs';
import {FormBuilder} from '@angular/forms';
import {SurveyService} from '../../services/survey.service';
import {Survey} from '../../models/survey';
import {DatePipe} from '@angular/common';

@Component({
  selector: 'app-listepatient',
  templateUrl: './listepatient.component.html',
  styleUrls: ['./listepatient.component.css'],
  providers: [DatePipe]
})
export class ListepatientComponent   implements OnInit {

  user: User = new User();
  ListUsers: User[];
  ListPatient: Patient[];
  ListPatientContacter = new Array();
  ListSurveyPatient: Survey[];
  searchInput;
  myDate = new Date();

  constructor(private patientService: PatientService, private surveyService: SurveyService, private router: Router) { }

  ngOnInit() {
    this.getPatient();


  }

  getPatient() {
    this.patientService.getByHospital(JSON.parse(localStorage.getItem('currentUser')).doc[0].hospital._id).subscribe(data => {
      console.log('dat ! ' + data);
      this.ListPatient = data;
      for (let i = 0 ; i < this.ListPatient.length ; i++) {
        if (this.ListPatient[i].orientation === 'Domicile') {
          console.log('dat 2 ! ' + this.ListPatient[i]._id);
          this.surveyService.getSurveyByPatient(this.ListPatient[i]._id).subscribe(dataSurvey => {
           // const d = this.myDate.getDate() - dataSurvey.date.getDate();
            this.ListSurveyPatient = dataSurvey;
            console.log('surv ! ' + this.ListSurveyPatient.length);
                if ( this.ListSurveyPatient.length === 0 ) {
                  console.log('51 ' + JSON.parse(JSON.stringify(this.ListPatient[i]))._id);
                  this.ListPatientContacter.push(JSON.parse(JSON.stringify(this.ListPatient[i])));
                } else if ( (this.myDate.getDate() - new Date(this.ListSurveyPatient[0].date).getDate()) <= 14) {
                  if (new Date(this.ListSurveyPatient[this.ListSurveyPatient.length - 1].date).getDate() !== this.myDate.getDate()) {
                    this.ListPatientContacter.push(JSON.parse(JSON.stringify(this.ListPatient[i])));
                  }
                } /*else {
                  for (let j = 0 ; j < this.ListSurveyPatient.length ; j++) {
                    if (this.ListSurveyPatient[j].patient._id !== this.ListPatient[i]._id) {
                      this.ListPatientContacter.push(JSON.parse(JSON.stringify(this.ListPatient[i])));
                    }
                  }
                }*/
            }, error => console.log(error)
          );
        }
      }
    }, error => console.log(error));
  }

  call(patient: Patient) {
    this.router.navigate(['/register'], { state: patient });
  }


}


