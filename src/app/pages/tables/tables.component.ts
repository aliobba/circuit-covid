import {Component, OnInit, QueryList, ViewChildren, ViewEncapsulation} from '@angular/core';
import {Patient} from '../../models/patient';
import {PatientService} from '../../services/patient.service';
import {Router} from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import {BehaviorSubject, Observable, of, Subject} from 'rxjs';
import {SortableDirective, SortColumn, SortDirection, SortEvent} from '../../directive/sortable.directive';
import {DecimalPipe} from '@angular/common';
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
  selector: 'app-tables',
  templateUrl: './tables.component.html',
  providers: [PatientService, DecimalPipe],
  styleUrls: ['./tables.component.scss'],
  encapsulation: ViewEncapsulation.None,
  styles: [`
    .dark-modal .modal-content {
      background-color: #292b2c;
      color: white;
    }
    .dark-modal .close {
      color: white;
    }
    .light-blue-backdrop {
      background-color: #5cb3fd;
    }
  `]
})
export class TablesComponent implements OnInit {
  patients$: Observable<Patient[]>;
  totals$: Observable<number>;
  ListPatient: Patient[];

  searchInput;
  private iduser: string;
  private username: string;
  private role: string;

  private _loading$ = new BehaviorSubject<boolean>(true);
  private _search$ = new Subject<void>();
  private _countries$ = new BehaviorSubject<Patient[]>([]);
  private _total$ = new BehaviorSubject<number>(0);

  private _state: State = {
    page: 1,
    pageSize: 4,
    searchTerm: '',
    sortColumn: '',
    sortDirection: ''
  };

  @ViewChildren(SortableDirective) headers: QueryList<SortableDirective>;

  constructor(private modalService: NgbModal, private patientService: PatientService, private router: Router) {
  }
  async ngOnInit() {
    this.username = JSON.parse(localStorage.getItem('currentUser')).user.user;
    this.role = JSON.parse(localStorage.getItem('currentUser')).user.role;

    this.iduser = JSON.parse(localStorage.getItem('currentUser')).doc[0]._id;

    this.ListPatient = await this.patientService.getByDocAsync(this.iduser) as Patient[];


    this._search$.pipe(
      tap(() => this._loading$.next(true)),
      debounceTime(1),
      switchMap(() => this._search()),
      delay(1),
      tap(() => this._loading$.next(false))
    ).subscribe(result => {
      this._countries$.next(result.patient);
      this._total$.next(result.total);
    });

    this._search$.next();

    this.patients$ = this.patient$;
    this.totals$ = this.total$;

  }
  // Getter
  get patient$() { return this._countries$.asObservable(); }
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



  openSm(content) {
    this.modalService.open(content, { size: 'sm' });
  }

  openLg(content) {
    this.modalService.open(content, { size: 'lg' });
  }
  update(patient: Patient) {
    this.router.navigate(['/updatepatient'], { state: patient });
  }

  details(patient: Patient) {
    this.router.navigate(['/fichepatient'], { state: patient });
  }
}


