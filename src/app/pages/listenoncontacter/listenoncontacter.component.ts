import { Component, OnInit } from '@angular/core';

import {User} from '../../models/user';
import {Patient} from '../../models/patient';
import {UsersService} from '../../services/users.service';
import {PatientService} from '../../services/patient.service';
import {Router} from '@angular/router';
import {SurveyService} from '../../services/survey.service';
import {Survey} from '../../models/survey';
import {DatePipe} from '@angular/common';

@Component({
  selector: 'app-listenoncontacter',
  templateUrl: './listenoncontacter.component.html',
  styleUrls: ['./listenoncontacter.component.css'],
  providers: [DatePipe]
})
export class ListenoncontacterComponent implements OnInit {

  user: User = new User();
  ListUsers: User[];
  ListPatient: Patient[];
  searchInput;
  ListPatientDejaContacter = new Array();
  ListSurveyPatient: Survey[];
  myDate = new Date();
  newDate: Date;
  constructor(private patientService: PatientService, private datePipe: DatePipe, private surveyService: SurveyService, private router: Router) { }

  ngOnInit() {
    this.getPatient();


  }

  getPatient() {
    this.patientService.getByHospital(JSON.parse(localStorage.getItem('currentUser')).doc[0].hospital._id).subscribe(data => {
      console.log('dat ! ' + data);
      this.ListPatient = data;
      for (let i = 0 ; i < this.ListPatient.length ; i++) {
        if (this.ListPatient[i].orientation === 'Domicile') {
          console.log('dat 2 ! ' + this.ListPatient[i].orientation);
          this.surveyService.getSurveyByPatient(this.ListPatient[i]._id).subscribe(dataSurvey => {
              this.ListSurveyPatient = dataSurvey;
              console.log('sur 50 ' + dataSurvey);
              this.newDate = new Date(this.ListSurveyPatient[0].date);
            const d = this.myDate.getDate() - this.newDate.getDate();
              console.log('date ' + d);
               if ( d <= 14) {
                 console.log('surv ! ' + this.ListSurveyPatient.length);
                if (new Date(this.ListSurveyPatient[this.ListSurveyPatient.length - 1].date).getDate() === this.myDate.getDate()) {
                  this.ListPatientDejaContacter.push(JSON.parse(JSON.stringify(this.ListPatient[i])));
                }
              }
            }, error => console.log(error)
          );
        }
      }
    }, error => console.log(error));
  }


}


