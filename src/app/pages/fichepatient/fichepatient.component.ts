import { Component, OnInit } from '@angular/core';
import {User} from '../../models/user';
import {Patient} from '../../models/patient';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {PatientService} from '../../services/patient.service';
import {ActivatedRoute, Router} from '@angular/router';
import {Observable} from 'rxjs';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {map} from 'rxjs/operators';
import * as jsPDF from 'jsPDF';
import html2canvas from 'html2canvas';
import localeFr from '@angular/common/locales/fr';
import {registerLocaleData} from '@angular/common';
import {Survey} from '../../models/survey';
import {SurveyService} from '../../services/survey.service';

// the second parameter 'fr-FR' is optional
registerLocaleData(localeFr, 'fr-FR');

@Component({
  selector: 'app-fichepatient',
  templateUrl: './fichepatient.component.html',
  styleUrls: ['./fichepatient.component.css']
})
export class FichepatientComponent implements OnInit {
  public isShow: boolean  ;
  public docadd: string;
  public docrole: string;
  public userstorage: string;
  ListSurveyPatient: Survey[];
  state$: Observable<any>;
  public patient: Patient[];
  public name: string;
  public familyName: string;
  public birthday: string;
  public gender: string;
  public cin: string;
  public phone: string;
  public secondPhone: string;
  public email: string;
  public address: string;
  public gouvernorat: string;
  public nationality: string;
  public ageusia: boolean;
  public anosmia: string;
  public asthenia: string;
  public fever: string;
  public headaches: string;
  public myalgia: string;
  public muscleSoreness: string;
  public confusion: string;
  public cough: string;
  public Rhinitis: string;
  public dyspnea: string;
  public nausea: string;
  public diarrhea: string;
  public vomit: string;
  public aeg: string;
  public chestPain: string;
  public expectoration: string;
  public respiratoryDistress: string;
  public neurologicalDistress: string;
  public hemodynamicInstability: string;
  public metabolicEmergency: string;
  public otherSymptomes: string;
  public symptomsStartDate: string;
  public firstSymptoms: string;
  public hta: string;
  public diabetes: string;
  public acFa: string;
  public heartFailure: string;
  public CoronaryArtery: string;
  public bpco: string;
  public asthma: string;
  public hemodialysis: string;
  public ischemicStrokes: string;
  public hemorrhagicStroke: string;
  public RenalFailure: string;
  public activeCancer: string;
  public immunosuppression: string;
  public pulmonaryPathology: string;
  public generalIllness: string;
  public smoker: string;
  public otherchronicPathologies: string;
  public usualTreatment: string;
  public ains: string;
  public corticotherapy: string;
  public immunosuppressant: string;
  public chemotherapy: string;
  public originFromAnEndemicArea: string;
  public contactWithAPositiveCovid: string;
  public ContactWithASuspectedCase: string;
  public respectForIsolation: string;
  public familyMembers: string;
  public fr: string;
  public spo2: string;
  public fio2: string;
  public pas: string;
  public pad: string;
  public fc: string;
  public gcs: string;
  public gad: string;
  public temperatur: string;
  public nad: string;
  public dob: string;
  public adr: string;
  public sedated: string;
  public signsOfStruggles: string;
  public coldEnds: string;
  public marbrure: string;
  public localCase: string;
  public healthCareWorker: string;
  public tdm: string;
  public datepcr: string;
  public pcr: string;
  public orientation: string;
  public hydroxycholoroquine: string;
  public chloroquine: string;
  public azithromycine: string;
  public paracetamol: string;
  public sintrom: string;
  public lopinavir: string;
  public oseltamivir: string;
  public corticoides: string;
  public heparine: string;
  public antibiotique: string;
  public otherTreatment: string;
  UpdatePatientForm: FormGroup;
  error = '';
  loading = false;
  submitted = false;
  isShown = true;
  // tslint:disable-next-line:max-line-length
  constructor(private fb: FormBuilder, private surveyService: SurveyService, private activatedRoute: ActivatedRoute, private router: Router, private patientService: PatientService) {}

  ngOnInit(): void {
    this.state$ = this.activatedRoute.paramMap.pipe(
      map(() => window.history.state)
    );

    this.state$.subscribe(
      patient => this.patient = patient
    );
    this.userstorage = localStorage.getItem('currentUser');
     this.docrole = (JSON.parse(this.userstorage).user.role);
     this.docadd = (JSON.parse(this.userstorage).user.name);
    this.name = JSON.parse(JSON.stringify(this.patient)).name;
    this.familyName = JSON.parse(JSON.stringify(this.patient)).familyName;
    this.birthday = JSON.parse(JSON.stringify(this.patient)).birthday;
    this.gender = JSON.parse(JSON.stringify(this.patient)).gender;
    this.cin = JSON.parse(JSON.stringify(this.patient)).cin;
    this.phone = JSON.parse(JSON.stringify(this.patient)).phone;
    this.secondPhone = JSON.parse(JSON.stringify(this.patient)).secondPhone;
    this.email = JSON.parse(JSON.stringify(this.patient)).email;
    this.address = JSON.parse(JSON.stringify(this.patient)).address;
    this.gouvernorat = JSON.parse(JSON.stringify(this.patient)).gouvernorat;
    this.nationality = JSON.parse(JSON.stringify(this.patient)).nationality;

    this.ageusia = JSON.parse(JSON.stringify(this.patient)).reasonForHospitalisation[0].symptoms[0].ageusia;
    if (this.ageusia) {
      this.isShown = true;
    } else {
      this.isShown = false;
    }
    this.anosmia = JSON.parse(JSON.stringify(this.patient)).reasonForHospitalisation[0].symptoms[0].anosmia;
    if (this.anosmia.toString()  === 'true') {
      console.log('taylor ', this.anosmia.toString());
      this.anosmia = 'oui';
    } else {
      this.anosmia = 'faux';

    }
    this.asthenia = JSON.parse(JSON.stringify(this.patient)).reasonForHospitalisation[0].symptoms[0].asthenia;

    if (this.asthenia.toString()  === 'true') {
      console.log('taylor ', this.asthenia.toString());
      this.asthenia = 'oui';
    } else {
      this.asthenia = 'faux';

    }


    this.fever = JSON.parse(JSON.stringify(this.patient)).reasonForHospitalisation[0].symptoms[0].fever;
    if (this.fever.toString()  === 'true') {
      this.fever = 'oui';
    } else {
      this.fever = 'faux';
    }

    this.headaches = JSON.parse(JSON.stringify(this.patient)).reasonForHospitalisation[0].symptoms[0].headaches;
    if (this.headaches.toString()  === 'true') {
      this.headaches = 'oui';
    } else {
      this.headaches = 'faux';
    }

    this.myalgia = JSON.parse(JSON.stringify(this.patient)).reasonForHospitalisation[0].symptoms[0].myalgia;
    if (this.myalgia.toString()  === 'true') {
      this.myalgia = 'oui';
    } else {
      this.myalgia = 'faux';
    }

    this.muscleSoreness = JSON.parse(JSON.stringify(this.patient)).reasonForHospitalisation[0].symptoms[0].muscleSoreness;
    if (this.muscleSoreness.toString()  === 'true') {
      this.muscleSoreness = 'oui';
    } else {
      this.muscleSoreness = 'faux';
    }



    this.confusion = JSON.parse(JSON.stringify(this.patient)).reasonForHospitalisation[0].symptoms[0].confusion;

    if (this.confusion.toString()  === 'true') {
      this.confusion = 'oui';
    } else {
      this.confusion = 'faux';
    }

    this.cough = JSON.parse(JSON.stringify(this.patient)).reasonForHospitalisation[0].symptoms[0].cough;
    if (this.cough.toString()  === 'true') {
      this.cough = 'oui';
    } else {
      this.cough = 'faux';
    }


    this.Rhinitis = JSON.parse(JSON.stringify(this.patient)).reasonForHospitalisation[0].symptoms[0].Rhinitis;
    if (this.Rhinitis.toString()  === 'true') {
      this.Rhinitis = 'oui';
    } else {
      this.Rhinitis = 'faux';
    }

    this.dyspnea = JSON.parse(JSON.stringify(this.patient)).reasonForHospitalisation[0].symptoms[0].dyspnea;

    if (this.dyspnea.toString()  === 'true') {
      this.dyspnea = 'oui';
    } else {
      this.dyspnea = 'faux';
    }

    this.nausea = JSON.parse(JSON.stringify(this.patient)).reasonForHospitalisation[0].symptoms[0].nausea;

    if (this.nausea.toString()  === 'true') {
      this.nausea = 'oui';
    } else {
      this.nausea = 'faux';
    }

    this.diarrhea = JSON.parse(JSON.stringify(this.patient)).reasonForHospitalisation[0].symptoms[0].diarrhea;

    if (this.diarrhea.toString()  === 'true') {
      this.diarrhea = 'oui';
    } else {
      this.diarrhea = 'faux';
    }
    this.vomit = JSON.parse(JSON.stringify(this.patient)).reasonForHospitalisation[0].symptoms[0].vomit;
    if (this.vomit.toString()  === 'true') {
      this.vomit = 'oui';
    } else {
      this.vomit = 'faux';
    }
    this.aeg = JSON.parse(JSON.stringify(this.patient)).reasonForHospitalisation[0].symptoms[0].aeg;
    if (this.aeg.toString()  === 'true') {
      this.aeg = 'oui';
    } else {
      this.aeg = 'faux';
    }
    this.chestPain = JSON.parse(JSON.stringify(this.patient)).reasonForHospitalisation[0].symptoms[0].chestPain;

    if (this.chestPain.toString()  === 'true') {
      this.chestPain = 'oui';
    } else {
      this.chestPain = 'faux';
    }

    this.expectoration = JSON.parse(JSON.stringify(this.patient)).reasonForHospitalisation[0].symptoms[0].expectoration;

    if (this.expectoration.toString()  === 'true') {
      this.expectoration = 'oui';
    } else {
      this.expectoration = 'faux';
    }


    this.respiratoryDistress = JSON.parse(JSON.stringify(this.patient)).reasonForHospitalisation[0].distress[0].respiratoryDistress;
    if (this.respiratoryDistress.toString()  === 'true') {
      this.respiratoryDistress = 'oui';
    } else {
      this.respiratoryDistress = 'faux';
    }

    this.neurologicalDistress = JSON.parse(JSON.stringify(this.patient)).reasonForHospitalisation[0].distress[0].neurologicalDistress;
    if (this.neurologicalDistress.toString()  === 'true') {
      this.neurologicalDistress = 'oui';
    } else {
      this.neurologicalDistress = 'faux';
    }
    this.hemodynamicInstability = JSON.parse(JSON.stringify(this.patient)).reasonForHospitalisation[0].distress[0].hemodynamicInstability;

    if (this.hemodynamicInstability.toString()  === 'true') {
      this.hemodynamicInstability = 'oui';
    } else {
      this.hemodynamicInstability = 'faux';
    }
    this.metabolicEmergency = JSON.parse(JSON.stringify(this.patient)).reasonForHospitalisation[0].distress[0].metabolicEmergency;
    if (this.metabolicEmergency.toString()  === 'true') {
      this.metabolicEmergency = 'oui';
    } else {
      this.metabolicEmergency = 'faux';
    }

    this.hta = JSON.parse(JSON.stringify(this.patient)).background[0].chronicPathologies[0].hta;
    if (this.hta.toString()  === 'true') {
      this.hta = 'oui';
    } else {
      this.hta = 'faux';
    }
    this.otherSymptomes = JSON.parse(JSON.stringify(this.patient)).reasonForHospitalisation[0].other;
    this.symptomsStartDate = JSON.parse(JSON.stringify(this.patient)).symptomsStartDate;
    this.firstSymptoms = JSON.parse(JSON.stringify(this.patient)).firstSymptoms;

    this.diabetes = JSON.parse(JSON.stringify(this.patient)).background[0].chronicPathologies[0].diabetes;
    if (this.diabetes.toString()  === 'true') {
      this.diabetes = 'oui';
    } else {
      this.diabetes = 'faux';
    }
    this.acFa = JSON.parse(JSON.stringify(this.patient)).background[0].chronicPathologies[0].acFa;
    if (this.acFa.toString()  === 'true') {
      this.acFa = 'oui';
    } else {
      this.acFa = 'faux';
    }
    this.heartFailure = JSON.parse(JSON.stringify(this.patient)).background[0].chronicPathologies[0].heartFailure;
    if (this.heartFailure.toString()  === 'true') {
      this.heartFailure = 'oui';
    } else {
      this.heartFailure = 'faux';
    }

    this.CoronaryArtery = JSON.parse(JSON.stringify(this.patient)).background[0].chronicPathologies[0].CoronaryArtery;
    if (this.CoronaryArtery.toString()  === 'true') {
      this.CoronaryArtery = 'oui';
    } else {
      this.CoronaryArtery = 'faux';
    }
    this.bpco = JSON.parse(JSON.stringify(this.patient)).background[0].chronicPathologies[0].bpco;
    if (this.bpco.toString()  === 'true') {
      this.bpco = 'oui';
    } else {
      this.bpco = 'faux';
    }
    this.asthma = JSON.parse(JSON.stringify(this.patient)).background[0].chronicPathologies[0].asthma;
    if (this.asthma.toString()  === 'true') {
      this.asthma = 'oui';
    } else {
      this.asthma = 'faux';
    }
    this.hemodialysis = JSON.parse(JSON.stringify(this.patient)).background[0].chronicPathologies[0].hemodialysis;
    if (this.hemodialysis.toString()  === 'true') {
      this.hemodialysis = 'oui';
    } else {
      this.hemodialysis = 'faux';
    }
    this.ischemicStrokes = JSON.parse(JSON.stringify(this.patient)).background[0].chronicPathologies[0].ischemicStroke;
    if (this.ischemicStrokes.toString()  === 'true') {
      this.ischemicStrokes = 'oui';
    } else {
      this.ischemicStrokes = 'faux';
    }
    this.hemorrhagicStroke = JSON.parse(JSON.stringify(this.patient)).background[0].chronicPathologies[0].hemorrhagicStroke;
    if (this.hemorrhagicStroke.toString()  === 'true') {
      this.hemorrhagicStroke = 'oui';
    } else {
      this.hemorrhagicStroke = 'faux';
    }

    this.RenalFailure = JSON.parse(JSON.stringify(this.patient)).background[0].chronicPathologies[0].RenalFailure;
    if (this.RenalFailure.toString()  === 'true') {
      this.RenalFailure = 'oui';
    } else {
      this.RenalFailure = 'faux';
    }

    this.activeCancer = JSON.parse(JSON.stringify(this.patient)).background[0].chronicPathologies[0].activeCancer;
    if (this.activeCancer.toString()  === 'true') {
      this.activeCancer = 'oui';
    } else {
      this.activeCancer = 'faux';
    }

    this.immunosuppression = JSON.parse(JSON.stringify(this.patient)).background[0].chronicPathologies[0].immunosuppression;
    if (this.immunosuppression.toString()  === 'true') {
      this.immunosuppression = 'oui';
    } else {
      this.immunosuppression = 'faux';
    }
    this.pulmonaryPathology = JSON.parse(JSON.stringify(this.patient)).background[0].chronicPathologies[0].pulmonaryPathology;

    if (this.pulmonaryPathology.toString()  === 'true') {
      this.pulmonaryPathology = 'oui';
    } else {
      this.pulmonaryPathology = 'faux';
    }
    this.generalIllness = JSON.parse(JSON.stringify(this.patient)).background[0].chronicPathologies[0].generalIllness;
    if (this.generalIllness.toString()  === 'true') {
      this.generalIllness = 'oui';
    } else {
      this.generalIllness = 'faux';
    }
    this.smoker = JSON.parse(JSON.stringify(this.patient)).background[0].chronicPathologies[0].smoker;
    if (this.smoker.toString()  === 'true') {
      this.smoker = 'oui';
    } else {
      this.smoker = 'faux';
    }




    this.otherchronicPathologies = JSON.parse(JSON.stringify(this.patient)).background[0].chronicPathologies[0].otherchronicPathologies;
    this.usualTreatment = JSON.parse(JSON.stringify(this.patient)).background[0].usualTreatment;
    this.ains = JSON.parse(JSON.stringify(this.patient)).background[0].recentTreatment[0].ains;
    if (this.ains.toString()  === 'true') {
      this.ains = 'oui';
    } else {
      this.ains = 'faux';
    }

    this.corticotherapy = JSON.parse(JSON.stringify(this.patient)).background[0].recentTreatment[0].corticotherapy;
    if (this.corticotherapy.toString()  === 'true') {
      this.corticotherapy = 'oui';
    } else {
      this.corticotherapy = 'faux';
    }


    this.immunosuppressant = JSON.parse(JSON.stringify(this.patient)).background[0].recentTreatment[0].immunosuppressant;
    if (this.immunosuppressant.toString()  === 'true') {
      this.immunosuppressant = 'oui';
    } else {
      this.immunosuppressant = 'faux';
    }



    this.chemotherapy = JSON.parse(JSON.stringify(this.patient)).background[0].recentTreatment[0].chemotherapy;

    if (this.chemotherapy.toString()  === 'true') {
      this.chemotherapy = 'oui';
    } else {
      this.chemotherapy = 'faux';
    }





    this.originFromAnEndemicArea = JSON.parse(JSON.stringify(this.patient)).typeOfContact[0].originFromAnEndemicArea;
    if (this.originFromAnEndemicArea.toString()  === 'true') {
      this.originFromAnEndemicArea = 'oui';
    } else {
      this.originFromAnEndemicArea = 'faux';
    }


    this.contactWithAPositiveCovid = JSON.parse(JSON.stringify(this.patient)).typeOfContact[0].contactWithAPositiveCovid;

    if (this.contactWithAPositiveCovid.toString()  === 'true') {
      this.contactWithAPositiveCovid = 'oui';
    } else {
      this.contactWithAPositiveCovid = 'faux';
    }

    this.ContactWithASuspectedCase = JSON.parse(JSON.stringify(this.patient)).typeOfContact[0].ContactWithASuspectedCase;

    if (this.ContactWithASuspectedCase.toString()  === 'true') {
      this.ContactWithASuspectedCase = 'oui';
    } else {
      this.ContactWithASuspectedCase = 'faux';
    }


    this.respectForIsolation = JSON.parse(JSON.stringify(this.patient)).typeOfContact[0].respectForIsolation;

    if (this.respectForIsolation.toString()  === 'true') {
      this.respectForIsolation = 'oui';
    } else {
      this.respectForIsolation = 'faux';
    }

    this.familyMembers = JSON.parse(JSON.stringify(this.patient)).typeOfContact[0].familyMembers;
    this.fr = JSON.parse(JSON.stringify(this.patient)).consultation[0].fr;
    this.spo2 = JSON.parse(JSON.stringify(this.patient)).consultation[0].spo2;
    this.fio2 = JSON.parse(JSON.stringify(this.patient)).consultation[0].fio2;
    this.pas = JSON.parse(JSON.stringify(this.patient)).consultation[0].pas;
    this.pad = JSON.parse(JSON.stringify(this.patient)).consultation[0].pad;
    this.fc = JSON.parse(JSON.stringify(this.patient)).consultation[0].fc;
    this.gcs = JSON.parse(JSON.stringify(this.patient)).consultation[0].gcs;
    this.gad = JSON.parse(JSON.stringify(this.patient)).consultation[0].gad;
    this.temperatur = JSON.parse(JSON.stringify(this.patient)).consultation[0].temperatur;
    this.nad = JSON.parse(JSON.stringify(this.patient)).consultation[0].sous[0].nad;
    if (this.nad.toString()  === 'true') {
      this.nad = 'oui';
    } else {
      this.nad = 'faux';
    }
    this.dob = JSON.parse(JSON.stringify(this.patient)).consultation[0].sous[0].dob;
    if (this.dob.toString()  === 'true') {
      this.dob = 'oui';
    } else {
      this.dob = 'faux';
    }
    this.adr = JSON.parse(JSON.stringify(this.patient)).consultation[0].sous[0].adr;
    if (this.adr.toString()  === 'true') {
      this.adr = 'oui';
    } else {
      this.adr = 'faux';
    }

    this.signsOfStruggles = JSON.parse(JSON.stringify(this.patient)).consultation[0].sous[0].signsOfStruggles;
    if (this.signsOfStruggles.toString()  === 'true') {
      this.signsOfStruggles = 'oui';
    } else {
      this.signsOfStruggles = 'faux';
    }

    this.coldEnds = JSON.parse(JSON.stringify(this.patient)).consultation[0].sous[0].coldEnds;
    if (this.coldEnds.toString()  === 'true') {
      this.coldEnds = 'oui';
    } else {
      this.coldEnds = 'faux';
    }
    this.marbrure = JSON.parse(JSON.stringify(this.patient)).consultation[0].sous[0].marbrure;
    if (this.marbrure.toString()  === 'true') {
      this.marbrure = 'oui';
    } else {
      this.marbrure = 'faux';
    }
    this.pcr = JSON.parse(JSON.stringify(this.patient)).pcr;
    this.orientation = JSON.parse(JSON.stringify(this.patient)).orientation;
    this.hydroxycholoroquine = JSON.parse(JSON.stringify(this.patient)).treatment[0].hydroxycholoroquine;
    if (this.hydroxycholoroquine.toString()  === 'true') {
      this.hydroxycholoroquine = 'oui';
    } else {
      this.hydroxycholoroquine = 'faux';
    }
    this.chloroquine = JSON.parse(JSON.stringify(this.patient)).treatment[0].chloroquine;
    if (this.chloroquine.toString()  === 'true') {
      this.chloroquine = 'oui';
    } else {
      this.chloroquine = 'faux';
    }
    this.azithromycine = JSON.parse(JSON.stringify(this.patient)).treatment[0].azithromycine;
    if (this.azithromycine.toString()  === 'true') {
      this.azithromycine = 'oui';
    } else {
      this.azithromycine = 'faux';
    }
    this.paracetamol = JSON.parse(JSON.stringify(this.patient)).treatment[0].paracetamol;
    if (this.paracetamol.toString()  === 'true') {
      this.paracetamol = 'oui';
    } else {
      this.paracetamol = 'faux';
    }
    this.sintrom = JSON.parse(JSON.stringify(this.patient)).treatment[0].sintrom;
    if (this.sintrom.toString()  === 'true') {
      this.sintrom = 'oui';
    } else {
      this.sintrom = 'faux';
    }
    this.lopinavir = JSON.parse(JSON.stringify(this.patient)).treatment[0].lopinavir;
    if (this.lopinavir.toString()  === 'true') {
      this.lopinavir = 'oui';
    } else {
      this.lopinavir = 'faux';
    }
    this.oseltamivir = JSON.parse(JSON.stringify(this.patient)).treatment[0].oseltamivir;
    if (this.oseltamivir.toString()  === 'true') {
      this.oseltamivir = 'oui';
    } else {
      this.oseltamivir = 'faux';
    }
    this.corticoides = JSON.parse(JSON.stringify(this.patient)).treatment[0].corticoides;
    if (this.corticoides.toString()  === 'true') {
      this.corticoides = 'oui';
    } else {
      this.corticoides = 'faux';
    }
    this.heparine = JSON.parse(JSON.stringify(this.patient)).treatment[0].heparine;
    this.antibiotique = JSON.parse(JSON.stringify(this.patient)).treatment[0].antibiotique;
    this.otherTreatment = JSON.parse(JSON.stringify(this.patient)).treatment[0].otherTreatment;


    this.createForm();

    this.getSurvey();

  }

  // liste surveillance journalier d'un patient
  getSurvey() {
    this.surveyService.getSurveyByPatient(JSON.parse(JSON.stringify(this.patient))._id).subscribe(data => {
        console.log('survey list ! ' + data);
        this.ListSurveyPatient = data;
        console.log('List Sur : ' + this.ListSurveyPatient.length);
      }, error => console.log(error)
    );
  }

  get f() {
    return this.UpdatePatientForm.controls;
  }

  createForm() {
    this.UpdatePatientForm = this.fb.group({
      familyName: ['', [Validators.required, Validators.minLength(2)]],
      name: ['', [Validators.required, Validators.minLength(2)]],
      birthday: ['', [Validators.maxLength(10), Validators.minLength(10)]],
      gender: ['', [Validators.required]],
      cin: ['', [Validators.maxLength(3), Validators.minLength(3)]],
      phone: ['', [Validators.maxLength(13), Validators.minLength(6)]],
      phoneSecond: ['', [Validators.maxLength(13), Validators.minLength(6)]],
      mail: ['', [Validators.email]],
      Adress: ['', [Validators.minLength(10)]],
      gouvernorat: ['', Validators.required],
      nationality: ['', Validators.required],
      ageusia: [false],
      anosmia: [false],
      asthenia: [false],
      fever: [false],
      headaches: [false],
      myalgia: [false],
      muscleSoreness: [false],
      confusion: [false],
      Rhinitis: [false],
      dyspnea: [false],
      nausea: [false],
      diarrhea: [false],
      vomit: [false],
      aeg: [false],
      chestPain: [false],
      expectoration: [false],
      respiratoryDistress: [false],
      neurologicalDistress: [false],
      hemodynamicInstability: [false],
      metabolicEmergency: [false],
      otherSymptomes: [''],
      symptomsStartDate: [''],
      firstSymptoms: [''],
      hta: [false],
      diabetes: [false],
      acFa: [false],
      heartFailure: [false],
      CoronaryArtery: [false],
      bpco: [false],
      asthma: [false],
      hemodialysis: [false],
      ischemicStrokes: [false],
      hemorrhagicStroke: [false],
      RenalFailure: [false],
      activeCancer: [false],
      immunosuppression: [false],
      pulmonaryPathology: [false],
      generalIllness: [false],
      smoker: [false],
      otherchronicPathologies: [''],
      usualTreatment: [''],
      ains: [false],
      corticotherapy: [false],
      immunosuppressant: [false],
      chemotherapy: [false],
      originFromAnEndemicArea: [false],
      contactWithAPositiveCovid: [false],
      ContactWithASuspectedCase: [false],
      respectForIsolation: [false],
      familyMembers: [''],
      fr: ['', [Validators.min(0), Validators.max(50)]],
      spo2: ['', [Validators.min(30), Validators.max(100)]],
      fio2: ['', [Validators.min(21), Validators.max(100)]],
      pas: ['', [Validators.min(0), Validators.max(30)]],
      pad: ['', [Validators.min(0), Validators.max(20)]],
      fc: ['', [Validators.min(0), Validators.max(300)]],
      gcs: ['', [Validators.min(3), Validators.max(15)]],
      gad: ['', [Validators.min(0.1), Validators.max(6)]],
      nad: [false],
      dob: [false],
      adr: [false],
      sedated: [false],
      signsOfStruggles: [false],
      coldEnds: [false],
      marbrure: [false],
      orientation: [''],
      pcr: [''],
      datepcr: [''],
      tdm: [''],
      healthCareWorker: [false],
      localCase: [false],
      hydroxycholoroquine: [false],
      chloroquine: [false],
      azithromycine: [false],
      paracetamol: [false],
      sintrom: [false],
      lopinavir: [false],
      oseltamivir: [false],
      corticoides: [false],
      heparine: [''],
      antibiotique: [''],
      temperatur: ['', [Validators.required, Validators.min(27), Validators.max(43)]],
      cough: [false],
      otherTreatment: [''],
    });
    this.SetValues();
  }

  // Injécter des valeurs dans les Inputs
  SetValues() {
    this.f.familyName.setValue(JSON.parse(JSON.stringify(this.patient)).familyName);
    this.f.name.setValue(JSON.parse(JSON.stringify(this.patient)).name);
    this.f.birthday.setValue(JSON.parse(JSON.stringify(this.patient)).birthday);
    this.f.gender.setValue(JSON.parse(JSON.stringify(this.patient)).gender);
    this.f.mail.setValue(JSON.parse(JSON.stringify(this.patient)).email);
    this.f.cin.setValue(JSON.parse(JSON.stringify(this.patient)).cin);
    this.f.phone.setValue(JSON.parse(JSON.stringify(this.patient)).phone);
    this.f.phoneSecond.setValue(JSON.parse(JSON.stringify(this.patient)).secondPhone);
    this.f.Adress.setValue(JSON.parse(JSON.stringify(this.patient)).address);
    this.f.gouvernorat.setValue(JSON.parse(JSON.stringify(this.patient)).gouvernorat);
    this.f.dyspnea.setValue(JSON.parse(JSON.stringify(this.patient)).reasonForHospitalisation[0].symptoms[0].dyspnea);
    this.f.chestPain.setValue(JSON.parse(JSON.stringify(this.patient)).reasonForHospitalisation[0].symptoms[0].chestPain);
    this.f.fever.setValue(JSON.parse(JSON.stringify(this.patient)).reasonForHospitalisation[0].symptoms[0].fever);
    this.f.asthenia.setValue(JSON.parse(JSON.stringify(this.patient)).reasonForHospitalisation[0].symptoms[0].asthenia);
    this.f.anosmia.setValue(JSON.parse(JSON.stringify(this.patient)).reasonForHospitalisation[0].symptoms[0].anosmia);
    this.f.ageusia.setValue(JSON.parse(JSON.stringify(this.patient)).reasonForHospitalisation[0].symptoms[0].ageusia);
    this.f.cough.setValue(JSON.parse(JSON.stringify(this.patient)).reasonForHospitalisation[0].symptoms[0].cough);
    this.f.expectoration.setValue(JSON.parse(JSON.stringify(this.patient)).reasonForHospitalisation[0].symptoms[0].expectoration);
    this.f.confusion.setValue(JSON.parse(JSON.stringify(this.patient)).reasonForHospitalisation[0].symptoms[0].confusion);
    this.f.diarrhea.setValue(JSON.parse(JSON.stringify(this.patient)).reasonForHospitalisation[0].symptoms[0].diarrhea);
    this.f.aeg.setValue(JSON.parse(JSON.stringify(this.patient)).reasonForHospitalisation[0].symptoms[0].aeg);
    this.f.nausea.setValue(JSON.parse(JSON.stringify(this.patient)).reasonForHospitalisation[0].symptoms[0].nausea);
    this.f.vomit.setValue(JSON.parse(JSON.stringify(this.patient)).reasonForHospitalisation[0].symptoms[0].vomit);
    this.f.headaches.setValue(JSON.parse(JSON.stringify(this.patient)).reasonForHospitalisation[0].symptoms[0].headaches);
    this.f.Rhinitis.setValue(JSON.parse(JSON.stringify(this.patient)).reasonForHospitalisation[0].symptoms[0].Rhinitis);
    this.f.myalgia.setValue(JSON.parse(JSON.stringify(this.patient)).reasonForHospitalisation[0].symptoms[0].myalgia);
    this.f.muscleSoreness.setValue(JSON.parse(JSON.stringify(this.patient)).reasonForHospitalisation[0].symptoms[0].muscleSoreness);
    // tslint:disable-next-line:max-line-length
    this.f.respiratoryDistress.setValue(JSON.parse(JSON.stringify(this.patient)).reasonForHospitalisation[0].distress[0].respiratoryDistress);
    // tslint:disable-next-line:max-line-length
    this.f.neurologicalDistress.setValue(JSON.parse(JSON.stringify(this.patient)).reasonForHospitalisation[0].distress[0].neurologicalDistress);
    // tslint:disable-next-line:max-line-length
    this.f.hemodynamicInstability.setValue(JSON.parse(JSON.stringify(this.patient)).reasonForHospitalisation[0].distress[0].hemodynamicInstability);
    this.f.metabolicEmergency.setValue(JSON.parse(JSON.stringify(this.patient)).reasonForHospitalisation[0].distress[0].metabolicEmergency);
    this.f.otherSymptomes.setValue(JSON.parse(JSON.stringify(this.patient)).reasonForHospitalisation[0].other);
    this.f.symptomsStartDate.setValue(JSON.parse(JSON.stringify(this.patient)).symptomsStartDate);
    this.f.firstSymptoms.setValue(JSON.parse(JSON.stringify(this.patient)).firstSymptoms);
    this.f.hta.setValue(JSON.parse(JSON.stringify(this.patient)).background[0].chronicPathologies[0].hta);
    this.f.diabetes.setValue(JSON.parse(JSON.stringify(this.patient)).background[0].chronicPathologies[0].diabetes);
    this.f.acFa.setValue(JSON.parse(JSON.stringify(this.patient)).background[0].chronicPathologies[0].acFa);
    this.f.heartFailure.setValue(JSON.parse(JSON.stringify(this.patient)).background[0].chronicPathologies[0].heartFailure);
    this.f.CoronaryArtery.setValue(JSON.parse(JSON.stringify(this.patient)).background[0].chronicPathologies[0].CoronaryArtery);
    this.f.bpco.setValue(JSON.parse(JSON.stringify(this.patient)).background[0].chronicPathologies[0].bpco);
    this.f.asthma.setValue(JSON.parse(JSON.stringify(this.patient)).background[0].chronicPathologies[0].asthma);
    this.f.ischemicStrokes.setValue(JSON.parse(JSON.stringify(this.patient)).background[0].chronicPathologies[0].ischemicStroke);
    this.f.hemorrhagicStroke.setValue(JSON.parse(JSON.stringify(this.patient)).background[0].chronicPathologies[0].hemorrhagicStroke);
    this.f.hemodialysis.setValue(JSON.parse(JSON.stringify(this.patient)).background[0].chronicPathologies[0].hemodialysis);
    this.f.immunosuppression.setValue(JSON.parse(JSON.stringify(this.patient)).background[0].chronicPathologies[0].immunosuppression);
    this.f.generalIllness.setValue(JSON.parse(JSON.stringify(this.patient)).background[0].chronicPathologies[0].generalIllness);
    this.f.activeCancer.setValue(JSON.parse(JSON.stringify(this.patient)).background[0].chronicPathologies[0].activeCancer);
    this.f.RenalFailure.setValue(JSON.parse(JSON.stringify(this.patient)).background[0].chronicPathologies[0].RenalFailure);
    this.f.smoker.setValue(JSON.parse(JSON.stringify(this.patient)).background[0].chronicPathologies[0].smoker);
    this.f.pulmonaryPathology.setValue(JSON.parse(JSON.stringify(this.patient)).background[0].chronicPathologies[0].pulmonaryPathology);
    // tslint:disable-next-line:max-line-length
    this.f.otherchronicPathologies.setValue(JSON.parse(JSON.stringify(this.patient)).background[0].chronicPathologies[0].otherchronicPathologies);
    this.f.ains.setValue(JSON.parse(JSON.stringify(this.patient)).background[0].recentTreatment[0].ains);
    this.f.corticotherapy.setValue(JSON.parse(JSON.stringify(this.patient)).background[0].recentTreatment[0].corticotherapy);
    this.f.immunosuppressant.setValue(JSON.parse(JSON.stringify(this.patient)).background[0].recentTreatment[0].immunosuppressant);
    this.f.chemotherapy.setValue(JSON.parse(JSON.stringify(this.patient)).background[0].recentTreatment[0].chemotherapy);
    this.f.usualTreatment.setValue(JSON.parse(JSON.stringify(this.patient)).background[0].usualTreatment);
    this.f.originFromAnEndemicArea.setValue(JSON.parse(JSON.stringify(this.patient)).typeOfContact[0].originFromAnEndemicArea);
    this.f.contactWithAPositiveCovid.setValue(JSON.parse(JSON.stringify(this.patient)).typeOfContact[0].contactWithAPositiveCovid);
    this.f.ContactWithASuspectedCase.setValue(JSON.parse(JSON.stringify(this.patient)).typeOfContact[0].ContactWithASuspectedCase);
    this.f.respectForIsolation.setValue(JSON.parse(JSON.stringify(this.patient)).typeOfContact[0].respectForIsolation);
    this.f.familyMembers.setValue(JSON.parse(JSON.stringify(this.patient)).typeOfContact[0].familyMembers);
    this.f.nad.setValue(JSON.parse(JSON.stringify(this.patient)).consultation[0].sous[0].nad);
    this.f.dob.setValue(JSON.parse(JSON.stringify(this.patient)).consultation[0].sous[0].dob);
    this.f.adr.setValue(JSON.parse(JSON.stringify(this.patient)).consultation[0].sous[0].adr);
    this.f.signsOfStruggles.setValue(JSON.parse(JSON.stringify(this.patient)).consultation[0].sous[0].signsOfStruggles);
    this.f.coldEnds.setValue(JSON.parse(JSON.stringify(this.patient)).consultation[0].sous[0].coldEnds);
    this.f.marbrure.setValue(JSON.parse(JSON.stringify(this.patient)).consultation[0].sous[0].marbrure);
    this.f.fr.setValue(JSON.parse(JSON.stringify(this.patient)).consultation[0].fr);
    this.f.spo2.setValue(JSON.parse(JSON.stringify(this.patient)).consultation[0].spo2);
    this.f.fio2.setValue(JSON.parse(JSON.stringify(this.patient)).consultation[0].fio2);
    this.f.pas.setValue(JSON.parse(JSON.stringify(this.patient)).consultation[0].pas);
    this.f.pad.setValue(JSON.parse(JSON.stringify(this.patient)).consultation[0].pad);
    this.f.fc.setValue(JSON.parse(JSON.stringify(this.patient)).consultation[0].fc);
    this.f.gcs.setValue(JSON.parse(JSON.stringify(this.patient)).consultation[0].gcs);
    this.f.gad.setValue(JSON.parse(JSON.stringify(this.patient)).consultation[0].gad);
    this.f.temperatur.setValue(JSON.parse(JSON.stringify(this.patient)).consultation[0].temperatur);
    this.f.pcr.setValue(JSON.parse(JSON.stringify(this.patient)).pcr);
    this.f.orientation.setValue(JSON.parse(JSON.stringify(this.patient)).orientation);
    this.f.hydroxycholoroquine.setValue(JSON.parse(JSON.stringify(this.patient)).treatment[0].hydroxycholoroquine);
    this.f.chloroquine.setValue(JSON.parse(JSON.stringify(this.patient)).treatment[0].chloroquine);
    this.f.azithromycine.setValue(JSON.parse(JSON.stringify(this.patient)).treatment[0].azithromycine);
    this.f.paracetamol.setValue(JSON.parse(JSON.stringify(this.patient)).treatment[0].paracetamol);
    this.f.sintrom.setValue(JSON.parse(JSON.stringify(this.patient)).treatment[0].sintrom);
    this.f.lopinavir.setValue(JSON.parse(JSON.stringify(this.patient)).treatment[0].lopinavir);
    this.f.oseltamivir.setValue(JSON.parse(JSON.stringify(this.patient)).treatment[0].oseltamivir);
    this.f.corticoides.setValue(JSON.parse(JSON.stringify(this.patient)).treatment[0].corticoides);
    this.f.heparine.setValue(JSON.parse(JSON.stringify(this.patient)).treatment[0].heparine);
    this.f.antibiotique.setValue(JSON.parse(JSON.stringify(this.patient)).treatment[0].antibiotique);
    this.f.otherTreatment.setValue(JSON.parse(JSON.stringify(this.patient)).treatment[0].otherTreatment);
  }


  public captureScreen4() {
    // tslint:disable-next-line:prefer-const
    let data = document.getElementById('test');
    console.log('inespdf');
    html2canvas(data).then(canvas => {
      // Few necessary setting options
      const imgWidth = 210;
      const pageHeight = 295;
      const imgHeight = canvas.height * imgWidth / canvas.width;
      let heightLeft = imgHeight;
      const imgData = canvas.toDataURL('image/png');

      const doc = new jsPDF('p', 'mm');
      let position = 0;

      doc.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;

      while (heightLeft >= 0) {
        position = heightLeft - imgHeight;
        doc.addPage();
        doc.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;
      }
      doc.save( 'file.pdf');﻿
    });
  }
}
