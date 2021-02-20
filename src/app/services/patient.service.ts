
import { Injectable } from '@angular/core';
import {Observable, throwError} from 'rxjs';
import {Patient} from '../models/patient';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {catchError, map} from 'rxjs/operators';
import { HttpHeaders } from '@angular/common/http';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json'
  })
};


@Injectable({
  providedIn: 'root'
})
export class PatientService {
  list: Patient[];
  patient: Patient[];
  private baseUrl = 'http://197.14.56.36:3000/patient';



  constructor(private http: HttpClient) {
  }

  getAllPatient(): Observable<Patient[]> {
    return this.http.get<Patient[]>(`${this.baseUrl}` + `/all`);
  }

  getByHospital(id: string) {
    return this.http.post<any>(`${this.baseUrl}` + `/getByHospitalService`, {
      hospital: {_id: id}
    }).pipe(map(doctor => {
      if (doctor) {
        console.log(doctor);
      }

      return doctor;
    }));
  }

  async  getByHospitalAsync(id: string) {
    return await this.http.post<any>(`${this.baseUrl}` + `/getByHospitalService`, {
      hospital: {_id: id}
    }).pipe(map(hopital => {
      if (hopital) {
        console.log(hopital);
      }

      return hopital;
    })).toPromise();
  }

  getByDoc(id: string) {
    return this.http.post<any>(`${this.baseUrl}` + `/getByDoctor`, {
      doctor: {_id: id}
    }).pipe(map(doctor => {
      if (doctor) {
        console.log(doctor);
      }

      return doctor;
    }));
  }

  async getByDocAsync(id: string) {
    return await this.http.post<any>(`${this.baseUrl}` + `/getByDoctor`, {
      doctor: {_id: id}
    }).pipe(map(doctor => {
      if (doctor) {
        console.log(doctor);
      }

      return doctor;
    })).toPromise();
  }

  updatePatient(id: number, patient: Patient): Observable<Patient> {
    return this.http.put<Patient>(this.baseUrl + '/update' + id, Patient);
  }

  createPatient(name: string,
                familyName: string,
                birthday: string,
                gender: string,
                email: string,
                cin: string,
                phone: string,
                secondPhone: string,
                address: string,
                gouvernorat: string,
                dyspnea: boolean,
                chestPain: boolean,
                fever: boolean,
                asthenia: boolean,
                anosmia: boolean,
                ageusia: boolean,
                cough: boolean,
                expectoration: boolean,
                confusion: boolean,
                diarrhea: boolean,
                aeg: boolean,
                nausea: boolean,
                vomit: boolean,
                headaches: boolean,
                Rhinitis: boolean,
                myalgia: boolean,
                muscleSoreness: boolean,
                respiratoryDistress: boolean,
                neurologicalDistress: boolean,
                hemodynamicInstability: boolean,
                metabolicEmergency: boolean,
                other: string,
                symptomsStartDate: string,
                firstSymptoms: string,
                hta: boolean,
                diabetes: boolean,
                acFa: boolean,
                heartFailure: boolean,
                CoronaryArtery: boolean,
                bpco: boolean,
                asthma: boolean,
                ischemicStroke: boolean,
                hemorrhagicStroke: boolean,
                hemodialysis: boolean,
                immunosuppression: boolean,
                generalIllness: boolean,
                activeCancer: boolean,
                RenalFailure: boolean,
                smoker: boolean,
                pulmonaryPathology: boolean,
                otherchronicPathologies: boolean,
                usualTreatment: string,
                ains: boolean,
                corticotherapy: boolean,
                immunosuppressant: boolean,
                chemotherapy: boolean,
                originFromAnEndemicArea: boolean,
                contactWithAPositiveCovid: boolean,
                ContactWithASuspectedCase: boolean,
                respectForIsolation: boolean,
                familyMembers: number,
                fr: number,
                spo2: number,
                fio2: number,
                pas: number,
                pad: number,
                fc: number,
                gcs: number,
                gad: number,
                temperatur: number,
                nad: boolean,
                dob: boolean,
                adr: boolean,
                signsOfStruggles: boolean,
                coldEnds: boolean,
                marbrure: boolean,
                pcr: string,
                orientation: string,
                hydroxycholoroquine: boolean,
                chloroquine: boolean,
                azithromycine: boolean,
                paracetamol: boolean,
                sintrom: boolean,
                lopinavir: boolean,
                oseltamivir: boolean,
                corticoides: boolean,
                heparine: string,
                antibiotique: string,
                otherTreatment: string) {
    return this.http.post<any>(`${this.baseUrl}` + `/add`, {
      pendingSurvey: false,
      patientState: 'risky',
      name: name,
      familyName: familyName,
      birthday: birthday,
      gender: gender,
      email: email,
      cin: cin,
      phone: phone,
      secondPhone: secondPhone,
      address: address,
      gouvernorat: gouvernorat,
      risky: true,
      alert: true,
      reasonForHospitalisation: [{
        symptoms: [{
          dyspnea: dyspnea,
          chestPain: chestPain,
          fever: fever,
          asthenia: asthenia,
          anosmia: anosmia,
          ageusia: ageusia,
          cough: cough,
          expectoration: expectoration,
          confusion: confusion,
          diarrhea: diarrhea,
          aeg: aeg,
          nausea: nausea,
          vomit: vomit,
          headaches: headaches,
          Rhinitis: Rhinitis,
          myalgia: myalgia,
          muscleSoreness: muscleSoreness
        }],
        distress: [{
          respiratoryDistress: respiratoryDistress,
          neurologicalDistress: neurologicalDistress,
          hemodynamicInstability: hemodynamicInstability,
          metabolicEmergency: metabolicEmergency
        }],
        other: other
      }],
      symptomsStartDate: symptomsStartDate,
      firstSymptoms: firstSymptoms,
      background: [{
        chronicPathologies: [{
          hta: hta,
          diabetes: diabetes,
          acFa: acFa,
          heartFailure: heartFailure,
          CoronaryArtery: CoronaryArtery,
          bpco: bpco,
          asthma: asthma,
          ischemicStroke: ischemicStroke,
          hemorrhagicStroke: hemorrhagicStroke,
          hemodialysis: hemodialysis,
          immunosuppression: immunosuppression,
          generalIllness: generalIllness,
          activeCancer: activeCancer,
          RenalFailure: RenalFailure,
          smoker: smoker,
          pulmonaryPathology: pulmonaryPathology,
          otherchronicPathologies: otherchronicPathologies
        }],
        usualTreatment: usualTreatment,
        recentTreatment: [{
          ains: ains,
          corticotherapy: corticotherapy,
          immunosuppressant: immunosuppressant,
          chemotherapy: chemotherapy
        }]
      }],
      typeOfContact: [{
        originFromAnEndemicArea: originFromAnEndemicArea,
        contactWithAPositiveCovid: contactWithAPositiveCovid,
        ContactWithASuspectedCase: ContactWithASuspectedCase,
        respectForIsolation: respectForIsolation,
        familyMembers: familyMembers
      }],
      consultation: [{
        fr: fr,
        spo2: spo2,
        fio2: fio2,
        pas: pas,
        pad: pad,
        fc: fc,
        gcs: gcs,
        gad: gad,
        temperatur: temperatur,
        sous: [{
          nad: nad,
          dob: dob,
          adr: adr,
          seduced: false,
          signsOfStruggles: signsOfStruggles,
          coldEnds: coldEnds,
          marbrure: marbrure,
          fine: 0,
          igs2: 0,
          sofa: 0
        }]
      }],
      pcr: pcr,
      orientation: orientation,
      doctor: {_id: JSON.parse(localStorage.getItem('currentUser')).doc[0]._id},
      user: {
        user: name + ' ' + familyName + ' : ' + birthday,
        pwd: name,
        role: 'patient',
        name: familyName
      },
      hospital : {_id: JSON.parse(localStorage.getItem('currentUser')).doc[0].hospital._id},
      treatment: [{
        hydroxycholoroquine: hydroxycholoroquine,
        chloroquine: chloroquine,
        azithromycine: azithromycine,
        paracetamol: paracetamol,
        sintrom: sintrom,
        lopinavir: lopinavir,
        oseltamivir: oseltamivir,
        corticoides: corticoides,
        heparine: heparine,
        antibiotique: antibiotique,
        otherTreatment: otherTreatment
      }]
    }).pipe(map(patient => {
      // login successful if there's a jwt token in the response
      if (patient) {
        console.log('tsab fil service : ' + JSON.stringify(patient));
        console.log('id doc : ' + JSON.parse(localStorage.getItem('currentUser')).doc[0]._id);
      }

      return patient;
    }));
  }


  UpdatePatient(id: string,
                name: string,
                familyName: string,
                birthday: string,
                gender: string,
                email: string,
                cin: string,
                phone: string,
                secondPhone: string,
                address: string,
                gouvernorat: string,
                dyspnea: boolean,
                chestPain: boolean,
                fever: boolean,
                asthenia: boolean,
                anosmia: boolean,
                ageusia: boolean,
                cough: boolean,
                expectoration: boolean,
                confusion: boolean,
                diarrhea: boolean,
                aeg: boolean,
                nausea: boolean,
                vomit: boolean,
                headaches: boolean,
                Rhinitis: boolean,
                myalgia: boolean,
                muscleSoreness: boolean,
                respiratoryDistress: boolean,
                neurologicalDistress: boolean,
                hemodynamicInstability: boolean,
                metabolicEmergency: boolean,
                other: string,
                symptomsStartDate: string,
                firstSymptoms: string,
                hta: boolean,
                diabetes: boolean,
                acFa: boolean,
                heartFailure: boolean,
                CoronaryArtery: boolean,
                bpco: boolean,
                asthma: boolean,
                ischemicStroke: boolean,
                hemorrhagicStroke: boolean,
                hemodialysis: boolean,
                immunosuppression: boolean,
                generalIllness: boolean,
                activeCancer: boolean,
                RenalFailure: boolean,
                smoker: boolean,
                pulmonaryPathology: boolean,
                otherchronicPathologies: boolean,
                usualTreatment: string,
                ains: boolean,
                corticotherapy: boolean,
                immunosuppressant: boolean,
                chemotherapy: boolean,
                originFromAnEndemicArea: boolean,
                contactWithAPositiveCovid: boolean,
                ContactWithASuspectedCase: boolean,
                respectForIsolation: boolean,
                familyMembers: number,
                fr: number,
                spo2: number,
                fio2: number,
                pas: number,
                pad: number,
                fc: number,
                gcs: number,
                gad: number,
                temperatur: number,
                nad: boolean,
                dob: boolean,
                adr: boolean,
                signsOfStruggles: boolean,
                coldEnds: boolean,
                marbrure: boolean,
                pcr: string,
                orientation: string,
                hydroxycholoroquine: boolean,
                chloroquine: boolean,
                azithromycine: boolean,
                paracetamol: boolean,
                sintrom: boolean,
                lopinavir: boolean,
                oseltamivir: boolean,
                corticoides: boolean,
                heparine: string,
                antibiotique: string,
                otherTreatment: string,
                iduser: string) {
    return this.http.put<any>(`http://197.14.56.36:3000/patient/update`, {
      _id : id,
      pendingSurvey: false,
      patientState: 'risky',
      name: name,
      familyName: familyName,
      birthday: birthday,
      gender: gender,
      email: email,
      cin: cin,
      phone: phone,
      secondPhone: secondPhone,
      address: address,
      gouvernorat: gouvernorat,
      risky: true,
      alert: true,
      reasonForHospitalisation: [{
        symptoms: [{
          dyspnea: dyspnea,
          chestPain: chestPain,
          fever: fever,
          asthenia: asthenia,
          anosmia: anosmia,
          ageusia: ageusia,
          cough: cough,
          expectoration: expectoration,
          confusion: confusion,
          diarrhea: diarrhea,
          aeg: aeg,
          nausea: nausea,
          vomit: vomit,
          headaches: headaches,
          Rhinitis: Rhinitis,
          myalgia: myalgia,
          muscleSoreness: muscleSoreness
        }],
        distress: [{
          respiratoryDistress: respiratoryDistress,
          neurologicalDistress: neurologicalDistress,
          hemodynamicInstability: hemodynamicInstability,
          metabolicEmergency: metabolicEmergency
        }],
        other: other
      }],
      symptomsStartDate: symptomsStartDate,
      firstSymptoms: firstSymptoms,
      background: [{
        chronicPathologies: [{
          hta: hta,
          diabetes: diabetes,
          acFa: acFa,
          heartFailure: heartFailure,
          CoronaryArtery: CoronaryArtery,
          bpco: bpco,
          asthma: asthma,
          ischemicStroke: ischemicStroke,
          hemorrhagicStroke: hemorrhagicStroke,
          hemodialysis: hemodialysis,
          immunosuppression: immunosuppression,
          generalIllness: generalIllness,
          activeCancer: activeCancer,
          RenalFailure: RenalFailure,
          smoker: smoker,
          pulmonaryPathology: pulmonaryPathology,
          otherchronicPathologies: otherchronicPathologies
        }],
        usualTreatment: usualTreatment,
        recentTreatment: [{
          ains: ains,
          corticotherapy: corticotherapy,
          immunosuppressant: immunosuppressant,
          chemotherapy: chemotherapy
        }]
      }],
      typeOfContact: [{
        originFromAnEndemicArea: originFromAnEndemicArea,
        contactWithAPositiveCovid: contactWithAPositiveCovid,
        ContactWithASuspectedCase: ContactWithASuspectedCase,
        respectForIsolation: respectForIsolation,
        familyMembers: familyMembers
      }],
      consultation: [{
        fr: fr,
        spo2: spo2,
        fio2: fio2,
        pas: pas,
        pad: pad,
        fc: fc,
        gcs: gcs,
        gad: gad,
        temperatur: temperatur,
        sous: [{
          nad: nad,
          dob: dob,
          adr: adr,
          seduced: false,
          signsOfStruggles: signsOfStruggles,
          coldEnds: coldEnds,
          marbrure: marbrure,
          fine: 0,
          igs2: 0,
          sofa: 0
        }]
      }],
      pcr: pcr,
      orientation: orientation,
      doctor: {_id: JSON.parse(localStorage.getItem('currentUser')).doc[0]._id},
      user: {_id: iduser},
      hospital : {_id: JSON.parse(localStorage.getItem('currentUser')).doc[0].hospital._id},
      treatment: [{
        hydroxycholoroquine: hydroxycholoroquine,
        chloroquine: chloroquine,
        azithromycine: azithromycine,
        paracetamol: paracetamol,
        sintrom: sintrom,
        lopinavir: lopinavir,
        oseltamivir: oseltamivir,
        corticoides: corticoides,
        heparine: heparine,
        antibiotique: antibiotique,
        otherTreatment: otherTreatment
      }]
    } ).pipe(map(patient => {
      // login successful if there's a jwt token in the response
      if (patient) {
        console.log('tsab fil service : ' + JSON.stringify(patient));
      }

      return patient;
    }));
  }



}
