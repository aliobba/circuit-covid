import {Component, OnInit, QueryList, ViewChildren} from '@angular/core';
import {User} from '../../models/user';
import {DoctorService} from '../../services/doctor.service';
import {Router} from '@angular/router';
import {Doctor} from '../../models/doctor';
import {SortableDocDirective, SortColumn, SortDirection, SortEvent} from '../../directive/directiveDoc/sortable.directive';
import {DecimalPipe} from '@angular/common';
import {BehaviorSubject, Observable, of, Subject} from 'rxjs';
import {debounceTime, delay, switchMap, tap} from 'rxjs/operators';

// interface résultat recherche avec le patient recherche et le total des résultats trouver
interface SearchResult {
  docteur: Doctor[];
  total: number;
}

// tslint:disable-next-line:max-line-length
// interface state pour la pagination avec le numero de la page courante et le nombre des pages le terme rechercher et la colonne de recherche et sa direction
interface State {
  page: number;
  pageSize: number;
  searchTerm: string;
  sortColumn: SortColumn;
  sortDirection: SortDirection;
}

// constante compare entre le mot rechercher et les mots a rechercher dans la liste
const compare = (v1: string, v2: string) => v1 < v2 ? -1 : v1 > v2 ? 1 : 0;

// fonction de recherche sort pour chercher dans la liste
function sort(docteurs: Doctor[], column: SortColumn, direction: string): Doctor[] {
  if (direction === '' || column === '') {
    return docteurs;
  } else {
    return [...docteurs].sort((a, b) => {
      const res = compare(`${a[column]}`, `${b[column]}`);
      return direction === 'asc' ? res : -res;
    });
  }
}

// fonction matches pour mettre en minuscule le terme a chercher et le mot dans le modèle
function matches(doctor: Doctor, term: string) {
  return doctor.name.toLowerCase().includes(term.toLowerCase());
    //|| doctor.cnom.toLowerCase().includes(term.toLowerCase());
}

@Component({
  selector: 'app-listalldoc',
  templateUrl: './listalldoc.component.html',
  providers: [DoctorService, DecimalPipe],
  styleUrls: ['./listalldoc.component.css']
})
export class ListalldocComponent implements OnInit {

  doctor: Doctor = new Doctor();
  ListDoctor: Doctor[];
  searchInput;
  idparent: string;
  listChecked: User[] = [];
  test: User = new User();
  stt = 'Stt';

  docteurs$: Observable<Doctor[]>;
  totals$: Observable<number>;

  private _loading$ = new BehaviorSubject<boolean>(true);
  private _search$ = new Subject<void>();
  private _docteurs$ = new BehaviorSubject<Doctor[]>([]);
  private _total$ = new BehaviorSubject<number>(0);

  private _state: State = {
    page: 1,
    pageSize: 4,
    searchTerm: '',
    sortColumn: '',
    sortDirection: ''
  };

  @ViewChildren(SortableDocDirective) headers: QueryList<SortableDocDirective>;

  constructor(private doctorService: DoctorService, private router: Router) { }

  async ngOnInit() {


    this.idparent = JSON.parse(localStorage.getItem('currentUser')).doc[0].hospital._id;
    console.log('inessparent' + this.idparent);


     /*this.doctorService.getByHospital(this.idparent).subscribe(data => {
       console.log(data);
      this.ListDoctor = data;
       console.log('listdocbyhop' + this.ListDoctor);
    }, error => console.log(error));*/

    this.ListDoctor = await this.doctorService.getByHospitalAsync(this.idparent) as Doctor[];

    this._search$.pipe(
      tap(() => this._loading$.next(true)),
      debounceTime(1),
      switchMap(() => this._search()),
      delay(1),
      tap(() => this._loading$.next(false))
    ).subscribe(result => {
      this._docteurs$.next(result.docteur);
      this._total$.next(result.total);
    });

    this._search$.next();


    this.docteurs$ = this.docteur$;
    this.totals$ = this.total$;

 }

  // Getter
  get docteur$() { return this._docteurs$.asObservable(); }
  get total$() { return this._total$.asObservable(); }
  get loading$() { return this._loading$.asObservable(); }
  get page() { return this._state.page; }
  get pageSize() { return this._state.pageSize; }
  get searchTerm() { return this._state.searchTerm; }

  // Setter
  set page(page: number) { this._set({page}); }
  set pageSize(pageSize: number) { this._set({pageSize}); }
  set searchTerm(searchTerm: string) { this._set({searchTerm}); }
  set sortColumn(sortColumn: SortColumn) { this._set({sortColumn}); }
  set sortDirection(sortDirection: SortDirection) { this._set({sortDirection}); }

  // permet de passer une interface partielle à une fonction
  private _set(patch: Partial<State>) {
    Object.assign(this._state, patch);
    this._search$.next();
  }

  // permet de chercher, filtrer et découper les pages
  private _search(): Observable<SearchResult> {
    const {sortColumn, sortDirection, pageSize, page, searchTerm} = this._state;

    // 1. sort
    let docteur = sort(this.ListDoctor, sortColumn, sortDirection);


    // 2. filter
    docteur = docteur.filter(doctor => matches(doctor, searchTerm));
    const total = docteur.length;

    // 3. paginate
    docteur = docteur.slice((page - 1) * pageSize, (page - 1) * pageSize + pageSize);
    return of({docteur, total});
  }

  // evenement onsort appeler dans les titres du html et inplémenter dans le directive
  onSort({column, direction}: SortEvent) {
    // resetting other headers
    this.headers.forEach(header => {
      if (header.sortable !== column) {
        header.direction = '';
      }
    });

    this.sortColumn = column;
    this.sortDirection = direction;
  }

}
