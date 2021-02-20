import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {PatientService} from '../../services/patient.service';


@Component({
  selector: 'app-ajoutpatient',
  templateUrl: './ajoutpatient.component.html',
  styleUrls: ['./ajoutpatient.component.css']
})
export class AjoutpatientComponent implements OnInit {
  AddPatientForm: FormGroup;
  error = '';
  loading = false;
  submitted = false;
  nationalites = ['' , 'Tunisie', 'Algérie', 'Libye', 'Maroc', 'France', 'Italie', 'Espagne', 'Chine', 'États-Unis (USA)', 'Royaume-Uni (UK)', 'Palestine', 'Canada', 'Afghanistan',  'Afrique du Sud',  'Akrotiri',  'Albanie', 'Allemagne', 'Andorre', 'Angola', 'Anguilla', 'Antarctique', 'Antigua-et-Barbuda', 'Arabie saoudite', 'Arctic Ocean', 'Argentine', 'Arménie', 'Aruba', 'Ashmore and Cartier Islands', 'Atlantic Ocean', 'Australie', 'Autriche', 'Azerbaïdjan', 'Bahamas', 'Bahreïn', 'Bangladesh', 'Barbade', 'Belau', 'Belgique', 'Belize', 'Bénin', 'Bermudes', 'Bhoutan', 'Biélorussie', 'Birmanie', 'Bolivie', 'Bosnie-Herzégovine', 'Botswana', 'Brésil', 'Brunei', 'Bulgarie', 'Burkina Faso', 'Burundi', 'Cambodge', 'Cameroun', 'Cap-Vert', 'Chili',  'Chypre', 'Clipperton Island', 'Colombie', 'Comores', 'Congo', 'Coral Sea Islands', 'Corée du Nord', 'Corée du Sud', 'Costa Rica',  'Côte d\'Ivoire', 'Croatie', 'Cuba', 'Curacao', 'Danemark', 'Dhekelia', 'Djibouti', 'Dominique', 'Égypte', 'Émirats arabes unis', 'Équateur', 'Érythrée',  'Estonie', 'Éthiopie', 'ex-République yougoslave de Macédoine', 'Finlande', 'Gabon', 'Gambie', 'Géorgie', 'Ghana', 'Gibraltar', 'Grèce', 'Grenade', 'Groenland', 'Guam', 'Guatemala', 'Guernsey', 'Guinée', 'Guinée équatoriale', 'Guinée-Bissao', 'Guyana', 'Haïti', 'Honduras', 'Hong Kong', 'Hongrie', 'Ile Bouvet', 'Ile Christmas', 'Ile Norfolk', 'Iles Cayman', 'Iles Cook', 'Iles des Cocos (Keeling)', 'Iles Falkland', 'Iles Féroé', 'Iles Fidji', 'Iles Géorgie du Sud et Sandwich du Sud', 'Iles Heard et McDonald', 'Iles Marshall', 'Iles Pitcairn', 'Iles Salomon', 'Iles Svalbard et Jan Mayen', 'Iles Turks-et-Caicos', 'Iles Vierges américaines', 'Iles Vierges britanniques', 'Inde', 'Indian Ocean', 'Indonésie', 'Iran', 'Iraq', 'Irlande', 'Islande', 'Jamaïque', 'Jan Mayen', 'Japon', 'Jersey', 'Jordanie', 'Kazakhstan', 'Kenya', 'Kirghizistan', 'Kiribati', 'Kosovo', 'Koweït', 'Laos', 'Lesotho', 'Lettonie', 'Liban', 'Liberia', 'Liechtenstein', 'Lituanie', 'Luxembourg', 'Macao', 'Madagascar', 'Malaisie', 'Malawi', 'Maldives', 'Mali', 'Malte', 'Man, Isle of', 'Mariannes du Nord', 'Maurice', 'Mauritanie', 'Mexique', 'Micronésie', 'Moldavie', 'Monaco', 'Monde', 'Mongolie', 'Monténégro', 'Montserrat', 'Mozambique', 'Namibie', 'Nauru', 'Navassa Island', 'Népal', 'Nicaragua', 'Niger', 'Nigeria', 'Nioué', 'Norvège', 'Nouvelle-Calédonie', 'Nouvelle-Zélande', 'Oman', 'Ouganda', 'Ouzbékistan', 'Pacific Ocean', 'Pakistan', 'Panama', 'Papouasie-Nouvelle-Guinée', 'Paracel Islands', 'Paraguay', 'Pays-Bas', 'Pérou', 'Philippines', 'Pologne', 'Polynésie française', 'Porto Rico', 'Portugal', 'Qatar', 'République centrafricaine', 'République démocratique du Congo (RDC)', 'République dominicaine', 'Roumanie', 'Russie', 'Rwanda', 'Sahara occidental', 'Saint-Barthélemy', 'Saint-Christophe-et-Niévès', 'Sainte-Hélène', 'Sainte-Lucie', 'Saint-Marin', 'Saint-Martin', 'Saint-Pierre-et-Miquelon', 'Saint-Siège', 'Saint-Vincent-et-les-Grenadines', 'Salvador', 'Samoa', 'Samoa américaines', 'Sao Tomé-et-Principe', 'Sénégal', 'Serbie', 'Seychelles', 'Sierra Leone', 'Singapour', 'Sint Maarten', 'Slovaquie', 'Slovénie', 'Somalie', 'Soudan', 'Soudan du Sud', 'Southern Ocean', 'Spratly Islands', 'Sri Lanka', 'Suède', 'Suisse', 'Suriname', 'Swaziland', 'Syrie', 'Tadjikistan', 'Taïwan', 'Tanzanie', 'Tchad', 'Terres australes françaises', 'Territoire britannique de l\'Océan Indien', 'Thaïlande', 'Timor Oriental', 'Togo', 'Tokélaou', 'Tonga', 'Trinité-et-Tobago',  'Turkménistan', 'Turquie', 'Tuvalu', 'Ukraine', 'Union européenne', 'Uruguay', 'Vanuatu', 'Venezuela', 'Viêt Nam', 'Wake Island', 'Wallis-et-Futuna', 'West Bank', 'Yémen', 'Zambie', 'Zimbabwe'];
  constructor( private fb: FormBuilder, private route: ActivatedRoute, private router: Router, private patientService:  PatientService ) { }

  ngOnInit(): void {
    this.createForm();
    console.log(this.f.gender.value);
  }

  get f() { return this.AddPatientForm.controls; }


  createForm() {
    this.AddPatientForm = this.fb.group({
      familyName: ['', [Validators.required, Validators.minLength(2)]],
      name: ['', [Validators.required, Validators.minLength(2)]],
      birthday: ['', [Validators.maxLength(10), Validators.minLength(10)]],
      gender: ['', [Validators.required]],
      cin: ['', [Validators.maxLength(3), Validators.minLength(3)]],
      phone: ['', [Validators.maxLength(13), Validators.minLength(6)]],
      phoneSecond: ['', [Validators.maxLength(13), Validators.minLength(6)]],
      mail: ['', [Validators.email]],
      Adress: ['', [Validators.minLength(5)]],
      gouvernorat: ['', Validators.required],
      nationality: [''],
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
      heparine: ['Non'],
      antibiotique: ['Non'],
      temperatur: ['', [ Validators.min(27), Validators.max(43)]],
      cough: [false],
      otherTreatment: [''],
    });
  }


  ajouter() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.AddPatientForm.invalid) {
      return;
    }

    //this.loading = true;
    this.patientService.createPatient(
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
      this.f.otherTreatment.value
    ).subscribe( data => {
        console.log('tsab fil ajout patient' + JSON.stringify(data));
        console.log('marbrure' + this.f.datepcr.value);
        this.router.navigate(['/tables']);
      },
      error => {
        this.error = error;
        this.loading = false;
      });

  }

}
