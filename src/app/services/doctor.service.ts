import { Injectable } from '@angular/core';
import {Doctor} from '../models/doctor';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';

import {map} from 'rxjs/operators';
import {User} from '../models/user';


@Injectable({
  providedIn: 'root'
})
export class DoctorService {

  list: Doctor[];
  private currentUserSubject: BehaviorSubject<Doctor>;
  private baseUrl = 'http://197.14.56.36:3000/doctor';
  constructor(private http: HttpClient) { }

  getAllDoctors(): Observable<Doctor[]> {
    return this.http.get<Doctor[]>(`${this.baseUrl}` + `/all`);
  }
  updateDoctor(id: number, doctor: Doctor): Observable<Doctor> {
    return this.http.put<Doctor>(this.baseUrl + '/update' + id, Doctor);
  }
  /*public createDoctor(doctor: Doctor) {
    console.log('bhim' + JSON.stringify(doctor));
    return this.http.post<Doctor>(`${this.baseUrl}` + `/add` , doctor);


  }*/

  createDoctor(nom: string, prenom: string, username: string, password: string, role: string) {
    console.log('esemou hné' + nom);
    return this.http.post<any>(`${this.baseUrl}` + `/add`, {
      name: nom,
      cnom: prenom,
      user : {
        user: username,
        pwd: password,
        name: nom + ' ' + prenom,
        role: role
      },
      parent : {_id: JSON.parse(localStorage.getItem('currentUser')).doc[0]._id},
      hospital : {_id : JSON.parse(localStorage.getItem('currentUser')).doc[0].hospital._id}
    }).pipe(map(doctor => {
      // login successful if there's a jwt token in the response
      if (doctor) {
        console.log(doctor);
      }

      return doctor;
    }));
  }



  createChef(nom: string, prenom: string, username: string, password: string) {
    console.log('esemou hné' + nom);
    return this.http.post<any>(`${this.baseUrl}` + `/add`, {
      name: nom,
      cnom: prenom,
      user : {
        user: username,
        pwd: password,
        name: nom + ' ' + prenom,
        role: 'chefService'
      },

      parent : {_id: JSON.parse(localStorage.getItem('currentUser')).doc[0]._id},
      hospital : {_id : JSON.parse(localStorage.getItem('currentUser')).doc[0].hospital._id}
    }).pipe(map(doctor => {
      // login successful if there's a jwt token in the response
      if (doctor) {
        console.log(doctor);
      }

      return doctor;
    }));
  }
  createTel(nom: string, prenom: string, username: string, password: string) {
    console.log('esemou hné' + nom);
    return this.http.post<any>(`${this.baseUrl}` + `/add`, {
      name: nom,
      cnom: prenom,
      user : {
        user: username,
        pwd: password,
        name: nom + ' ' + prenom,
        role: 'télésuivi'
      },
      parent : {_id: JSON.parse(localStorage.getItem('currentUser')).doc[0]._id},
      hospital : {_id : JSON.parse(localStorage.getItem('currentUser')).doc[0].hospital._id}
    }).pipe(map(doctor => {
      // login successful if there's a jwt token in the response
      if (doctor) {
        console.log(doctor);
      }

      return doctor;
    }));
  }


  createAdminHop(nom: string, prenom: string, username: string, password: string,
                 hop: string, typehop: string , gouvernorat: string, delegation: string , Adress: string , codepost: Number) {
    console.log('esemou hné' + nom);
    return this.http.post<any>(`${this.baseUrl}` + `/add`, {
      name: nom,
      cnom: prenom,
      user : {
        user: username,
        pwd: password,
        name: nom + ' ' + prenom,
        role: 'Admin de l’hopital'
      },
      parent : {_id : JSON.parse(localStorage.getItem('currentUser')).user.id},
      hospital : {
        name : hop ,
        gouvernorat: gouvernorat,
        delegation: delegation,
        type: typehop,
        adresse: Adress,
        codePostale: codepost

      }
    }).pipe(map(doctor => {
      // login successful if there's a jwt token in the response
      if (doctor) {
        console.log(doctor);
      }

      return doctor;
    }));
  }




   docById(id: string) {
    return this.http.post<any>(  `${this.baseUrl}` + `/getByID`, {
      doctor : { _id : id }
    }).pipe(map(doctor => {
      if (doctor) {
        this.currentUserSubject.next(doctor);
      }

      return doctor;
    }));
  }


  public UsersByParentId(id: string) {
    return this.http.post<any>(  `${this.baseUrl}` + `/getByParentID`, {
     _id : id
    }).pipe(map(doctor => {

      return doctor;
    }));
  }









  public deleteDoctor(doctor) {
    return this.http.delete(this.baseUrl + '/delete' + doctor.id);
  }
  refreshList() {
    this.http.get(this.baseUrl + '/all')
      .toPromise().then(res => this.list = res as Doctor[]);
  }





  getByHospital(id: string) {
    return this.http.post<any>(`${this.baseUrl}` + `/getByHospitalService`, {
    hospital: {_id: id}
  }).pipe(map(doctor => {

  return doctor;
}));
}

async getByHospitalAsync (id: string) {
    return await this.http.post<any>(`${this.baseUrl}` + `/getByHospitalService`, {
      hospital: {_id: id}
    }).pipe(map(hopital => {
      if (hopital) {
        console.log(hopital);
      }

      return hopital;
    })).toPromise();
}


}
