import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, NavigationStart, Router} from '@angular/router';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {Patient} from '../../models/patient';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {PatientService} from '../../services/patient.service';

@Component({
  selector: 'app-updatepatient',
  templateUrl: './updatepatient.component.html',
  styleUrls: ['./updatepatient.component.css']
})
export class UpdatepatientComponent implements OnInit {

  state$: Observable<any>;
  public patient: Patient[];
  UpdatePatientForm: FormGroup;
  error = '';
  loading = false;
  submitted = false;
  constructor( private fb: FormBuilder, private activatedRoute: ActivatedRoute, private router: Router, private patientService:  PatientService) { }

  ngOnInit(): void {
    this.state$ = this.activatedRoute.paramMap.pipe(
      map(() => window.history.state)
    );

    this.state$.subscribe(
      patient => this.patient = patient
    );
    console.log( 'data222 : ' + JSON.stringify(this.patient));
    console.log( 'data33 : ' + JSON.parse(JSON.stringify(this.patient)).familyName);
    this.createForm();


  }

  get f() { return this.UpdatePatientForm.controls; }

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
      spo2: ['', [ Validators.min(30), Validators.max(100)]],
      fio2: ['', [ Validators.min(21), Validators.max(100)]],
      pas: ['', [ Validators.min(0), Validators.max(30)]],
      pad: ['', [ Validators.min(0), Validators.max(20)]],
      fc:  ['', [ Validators.min(0), Validators.max(300)]],
      gcs: ['', [ Validators.min(3), Validators.max(15)]],
      gad: ['', [ Validators.min(0.1), Validators.max(6)]],
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

  //Injécter des valeurs dans les Inputs
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
    this.f.respiratoryDistress.setValue(JSON.parse(JSON.stringify(this.patient)).reasonForHospitalisation[0].distress[0].respiratoryDistress);
    this.f.neurologicalDistress.setValue(JSON.parse(JSON.stringify(this.patient)).reasonForHospitalisation[0].distress[0].neurologicalDistress);
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

  update() {
    this.submitted = true;
    console.log('d5al : ' + this.f.pcr.value);
    console.log('d5al : ' + this.f.orientation.value);


    this.loading = true;
    this.patientService.UpdatePatient(
      JSON.parse(JSON.stringify(this.patient))._id,
      this.f.name.value,
      this.f.familyName.value,
      this.f.birthday.value,
      this.f.gender.value,
      this.f.mail.value,
      this.f.cin.value,
      this.f.phone.value,
      this.f.phoneSecond.value,
      this.f.Adress.value,
      this.f.gouvernorat.value,
      this.f.dyspnea.value,
      this.f.chestPain.value,
      this.f.fever.value,
      this.f.asthenia.value,
      this.f.anosmia.value,
      this.f.ageusia.value,
      this.f.cough.value,
      this.f.expectoration.value,
      this.f.confusion.value,
      this.f.diarrhea.value,
      this.f.aeg.value,
      this.f.nausea.value,
      this.f.vomit.value,
      this.f.headaches.value,
      this.f.Rhinitis.value,
      this.f.myalgia.value,
      this.f.muscleSoreness.value,
      this.f.respiratoryDistress.value,
      this.f.neurologicalDistress.value,
      this.f.hemodynamicInstability.value,
      this.f.metabolicEmergency.value,
      this.f.otherSymptomes.value,
      this.f.symptomsStartDate.value,
      this.f.firstSymptoms.value,
      this.f.hta.value,
      this.f.diabetes.value,
      this.f.acFa.value,
      this.f.heartFailure.value,
      this.f.CoronaryArtery.value,
      this.f.bpco.value,
      this.f.asthma.value,
      this.f.ischemicStrokes.value,
      this.f.hemorrhagicStroke.value,
      this.f.hemodialysis.value,
      this.f.immunosuppression.value,
      this.f.generalIllness.value,
      this.f.activeCancer.value,
      this.f.RenalFailure.value,
      this.f.smoker.value,
      this.f.pulmonaryPathology.value,
      this.f.otherchronicPathologies.value,
      this.f.usualTreatment.value,
      this.f.ains.value,
      this.f.corticotherapy.value,
      this.f.immunosuppressant.value,
      this.f.chemotherapy.value,
      this.f.originFromAnEndemicArea.value,
      this.f.contactWithAPositiveCovid.value,
      this.f.ContactWithASuspectedCase.value,
      this.f.respectForIsolation.value,
      this.f.familyMembers.value,
      this.f.fr.value,
      this.f.spo2.value,
      this.f.fio2.value,
      this.f.pas.value,
      this.f.pad.value,
      this.f.fc.value,
      this.f.gcs.value,
      this.f.gad.value,
      this.f.temperatur.value,
      this.f.nad.value,
      this.f.dob.value,
      this.f.adr.value,
      this.f.signsOfStruggles.value,
      this.f.coldEnds.value,
      this.f.marbrure.value,
      this.f.pcr.value,
      this.f.orientation.value,
      this.f.hydroxycholoroquine.value,
      this.f.chloroquine.value,
      this.f.azithromycine.value,
      this.f.paracetamol.value,
      this.f.sintrom.value,
      this.f.lopinavir.value,
      this.f.oseltamivir.value,
      this.f.corticoides.value,
      this.f.heparine.value,
      this.f.antibiotique.value,
      this.f.otherTreatment.value,
      JSON.parse(JSON.stringify(this.patient)).user._id
    ).subscribe( data => {
        console.log('tsab fil ajout patient' + JSON.stringify(data));
        console.log('marbrure' + this.f.datepcr.value);
        this.router.navigate(['/tables']);
      },
      error => {
        this.error = error;
        this.loading = false;
        console.log('false');
      });
  }

}
