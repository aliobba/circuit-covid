import { Injectable } from '@angular/core';
import {map} from 'rxjs/operators';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SurveyService {
  private baseUrl = 'http://197.14.56.36:3000/survey';
  myDate = new Date();

  constructor(private http: HttpClient) { }

  getSurveyByPatient (id: string) {
    return this.http.post<any>(`${this.baseUrl}` + `/getByPatient`, {
    patient: {_id : id}
    }).pipe(map(survey => {
      if (survey) {
        console.log(survey);
      }

      return survey;
    }));
  }

  createSurvey(name: string,
               date: string,
               dyspnea: boolean,
               chestPain: boolean,
               cough: boolean,
               asthenia: boolean,
               ageusia: boolean,
               anosmia: boolean,
               nausea: boolean,
               diarrhea: boolean,
               vomit: boolean,
               respiratoryDistress: boolean,
               headache: boolean,
               myalgia: boolean,
               confusion: boolean,
               rhinitis: boolean,
               abdominalPain: boolean,
               odynophagia: boolean,
               temperatur: number,
               pas: number,
               pad: number,
               idPatient: string) {
    return this.http.post<any>(`${this.baseUrl}` + `/add`, {
      name: name,
      date: date,
      dyspnea: dyspnea,
      chestPain: chestPain,
      cough: cough,
      asthenia: asthenia,
      ageusia: ageusia,
      anosmia: anosmia,
      nausea: nausea,
      diarrhea: diarrhea,
      vomit: vomit,
      respiratoryDistress: respiratoryDistress,
      headache: headache,
      myalgia: myalgia,
      confusion: confusion,
      rhinitis: rhinitis,
      abdominalPain: abdominalPain,
      odynophagia: odynophagia,
      temperatur: temperatur,
      pas: pas,
      pad: pad,
      user: {
      _id: JSON.parse(localStorage.getItem('currentUser')).user._id
    },
      patient: {
        _id: idPatient
      }

    }).pipe(map(survey => {
      // login successful if there's a jwt token in the response
      if (survey) {
        console.log('tsab fil service : ' + JSON.stringify(survey));
        console.log('id doc : ' + JSON.parse(localStorage.getItem('currentUser')).doc[0]._id);
      }

      return survey;
    }));
  }
}
