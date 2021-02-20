import { Injectable } from '@angular/core';
import {User} from '../models/User';
import {HttpClient} from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';

import { map } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})

export class UsersService {
  private currentUserSubject: BehaviorSubject<User>;
  public currentUser: Observable<User>;
  selected: User;
  formData: User;
  list: User[];

  private baseUrl = 'http://197.14.56.36:3000/users';

  constructor(private http: HttpClient) {
    this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
    this.currentUser = this.currentUserSubject.asObservable();
  }
  getAllUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${this.baseUrl}` + `/user/getall`);
  }
  public createUser(user: User) {
    return this.http.post<User>(`${this.baseUrl}` + `/register` , user);
  }
  refreshList() {
    this.http.get(this.baseUrl + '/user/getall')
      .toPromise().then(res => this.list = res as User[]);
  }
  public get currentUserValue(): User {
    return this.currentUserSubject.value;
  }

  login(username: string, password: string) {
    return this.http.post<any>(`${this.baseUrl}` + `/login`, { username, password })
      .pipe(map(user => {
        // login successful if there's a jwt token in the response
        if (user && user.token) {
          // store user details and jwt token in local storage to keep user logged in between page refreshes
          localStorage.setItem('currentUser', JSON.stringify(user));
          this.currentUserSubject.next(user);
        }

        return user;
      }));
  }

  updateUser(id: number, user: User): Observable<User> {
    return this.http.put<User>(this.baseUrl + '/update/' + id, user);
  }

updatePwd(id: string, pwd: string, newpwd: string, confpwd: string) {
    console.log('ma5ltch : ' + newpwd);
    console.log('ma5ltch id : ' + id) ;
  // tslint:disable-next-line:max-line-length
    return this.http.post<any>(`${this.baseUrl}` + `/changePassword`, { _id : id, old_password: pwd, new_password: newpwd, confirm_password: confpwd })
      .pipe(map(user => {


        return user;
      }));
  }


}
