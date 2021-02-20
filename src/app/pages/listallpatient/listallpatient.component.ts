import {Component, OnInit, QueryList, ViewChildren} from '@angular/core';
import {User} from '../../models/user';
import {Patient} from '../../models/patient';
import {PatientService} from '../../services/patient.service';
import {Router} from '@angular/router';
import {SortableDirective, SortColumn, SortDirection, SortEvent} from '../../directive/sortable.directive';
import {DecimalPipe} from '@angular/common';
import {BehaviorSubject, Observable, of, Subject} from 'rxjs';
import {debounceTime, delay, switchMap, tap} from 'rxjs/operators';

// interface résultat recherche avec le patient recherche et le total des résultats trouver
interface SearchResult {
  patient: Patient[];
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
function sort(patients: Patient[], column: SortColumn, direction: string): Patient[] {
  if (direction === '' || column === '') {
    return patients;
  } else {
    return [...patients].sort((a, b) => {
      const res = compare(`${a[column]}`, `${b[column]}`);
      return direction === 'asc' ? res : -res;
    });
  }
}

// fonction matches pour mettre en minuscule le terme a chercher et le mot dans le modèle
function matches(country: Patient, term: string) {
  return country.name.toLowerCase().includes(term.toLowerCase())
    || country.familyName.toLowerCase().includes(term.toLowerCase());
}

@Component({
  selector: 'app-listallpatient',
  templateUrl: './listallpatient.component.html',
  providers: [PatientService, DecimalPipe],
  styleUrls: ['./listallpatient.component.css']
})
export class ListallpatientComponent implements OnInit {

  user: User = new User();
  ListPatient: Patient[];
  searchInput;
  idhosp: string;
  username: string;

  patients$: Observable<Patient[]>;
  totals$: Observable<number>;

  private _loading$ = new BehaviorSubject<boolean>(true);
  private _search$ = new Subject<void>();
  private _patients$ = new BehaviorSubject<Patient[]>([]);
  private _total$ = new BehaviorSubject<number>(0);

  private _state: State = {
    page: 1,
    pageSize: 4,
    searchTerm: '',
    sortColumn: '',
    sortDirection: ''
  };

  @ViewChildren(SortableDirective) headers: QueryList<SortableDirective>;

  constructor(private patientService: PatientService, private router: Router) { }

  async ngOnInit() {

    this.idhosp = JSON.parse(localStorage.getItem('currentUser')).doc[0].hospital._id;

    console.log('liste des patients de l hôpital : ' + this.idhosp);
    /*this.patientService.getByHospital(this.idhosp).subscribe(data => {

      console.log(data);
      this.ListPatient = data;
      console.log('ines data jét',  this.ListPatient);

    }, error => console.log(error));*/

    this.ListPatient = await this.patientService.getByHospitalAsync(this.idhosp) as Patient[];

    this._search$.pipe(
      tap(() => this._loading$.next(true)),
      debounceTime(1),
      switchMap(() => this._search()),
      delay(1),
      tap(() => this._loading$.next(false))
    ).subscribe(result => {
      this._patients$.next(result.patient);
      this._total$.next(result.total);
    });

    this._search$.next();

    this.patients$ = this.patient$;
    this.totals$ = this.total$;
  }

  // Getter
  get patient$() { return this._patients$.asObservable(); }
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
    let patient = sort(this.ListPatient, sortColumn, sortDirection);


    // 2. filter
    patient = patient.filter(country => matches(country, searchTerm));
    const total = patient.length;

    // 3. paginate
    patient = patient.slice((page - 1) * pageSize, (page - 1) * pageSize + pageSize);
    return of({patient, total});
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
