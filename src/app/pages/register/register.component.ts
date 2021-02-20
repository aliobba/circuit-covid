import { Component, OnInit } from '@angular/core';

import {Patient} from '../../models/patient';

import {PatientService} from '../../services/patient.service';
import {ActivatedRoute, Router} from '@angular/router';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {HttpClient} from '@angular/common/http';
import {DatePipe} from '@angular/common';
import {map} from 'rxjs/operators';
import {Observable} from 'rxjs';
import {SurveyService} from '../../services/survey.service';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
  providers: [DatePipe]
})
export class RegisterComponent implements OnInit {
// Fiche patient à surveiller
  patient: Patient = new Patient();
  AddSurveyForm: FormGroup;
  ListPatient: Patient[];
  searchInput;
  error = '';
  submitted = false;
  loading = false;
  myDate = new Date();
  newDate: Date;
  state$: Observable<any>;
  public patientArray: Patient[];

  constructor(private fb: FormBuilder, private patientService: PatientService, private surveyService: SurveyService,
              private router: Router, private datePipe: DatePipe, private activatedRoute: ActivatedRoute) { }

  get f() { return this.AddSurveyForm.controls; }

  ngOnInit() {
    this.patientService.getAllPatient().subscribe(data => {
      console.log(data);
      this.ListPatient = data;
    }, error => console.log(error));
  console.log(this.datePipe.transform(this.myDate, 'yyyy-MM-dd'));
  this.newDate = new Date('2020-05-12');
  const d = this.myDate.getDate() - this.newDate.getDate();
  console.log('difference : ' + d);

    this.state$ = this.activatedRoute.paramMap.pipe(
      map(() => window.history.state)
    );

    this.state$.subscribe(
      patient => this.patientArray = patient
    );


    this.createForm();

    this.f.familyName.setValue(JSON.parse(JSON.stringify(this.patientArray)).familyName);
    this.f.name.setValue(JSON.parse(JSON.stringify(this.patientArray)).name);

  }

  createForm() {
    this.AddSurveyForm = this.fb.group({
      familyName: [''],
      name: [''],
      dyspnea: [false],
      chestPain: [false],
      cough: [false],
      asthenia: [false],
      ageusia: [false],
      anosmia: [false],
      nausea: [false],
      diarrhea: [false],
      vomit: [false],
      respiratoryDistress: [false],
      headache: [false],
      myalgia: [false],
      confusion: [false],
      Rhinitis: [false],
      abdominalPain: [false],
      odynophagia: [false],
      temperatur: [37],
      pas: [0],
      pad: [0],

    });
  }


  ajouter() {
    this.submitted = true;

    this.loading = true;
    this.surveyService.createSurvey(
      this.f.familyName.value + '' + this.f.name.value,
      this.datePipe.transform(this.myDate, 'yyyy-MM-dd'),
      this.f.dyspnea.value,
      this.f.chestPain.value,
      this.f.cough.value,
      this.f.asthenia.value,
      this.f.ageusia.value,
      this.f.anosmia.value,
      this.f.nausea.value,
      this.f.diarrhea.value,
      this.f.vomit.value,
      this.f.respiratoryDistress.value,
      this.f.headache.value,
      this.f.myalgia.value,
      this.f.confusion.value,
      this.f.Rhinitis.value,
      this.f.abdominalPain.value,
      this.f.odynophagia.value,
      this.f.temperatur.value,
      this.f.pas.value,
      this.f.pad.value,
      JSON.parse(JSON.stringify(this.patientArray))._id

    ).subscribe( data => {
        console.log('tsab fil ajout patient' + JSON.stringify(data));
        this.router.navigate(['/listenoncontacter']);
      },
      error => {
        this.error = error;
        this.loading = false;
        console.log('false');
      });
  }

}

