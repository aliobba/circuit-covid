import { Routes } from '@angular/router';

import { AjoutchefserviceComponent } from '../../pages/ajoutchefservice/ajoutchefservice.component';
import { FichepatientComponent } from '../../pages/fichepatient/fichepatient.component';
import { AjoutsurveyComponent } from '../../pages/ajoutsurvey/ajoutsurvey.component';

import { DashboardComponent } from '../../pages/dashboard/dashboard.component';

import { DssbAdminComponent } from '../../pages/dssb-admin/dssb-admin.component';
import { UserProfileComponent } from '../../pages/user-profile/user-profile.component';
import { TablesComponent } from '../../pages/tables/tables.component';
import {RegisterComponent} from '../../pages/register/register.component';
import { ListepatientComponent } from '../../pages/listepatient/listepatient.component';
import { ListenoncontacterComponent } from '../../pages/listenoncontacter/listenoncontacter.component';

import { ListallpatientComponent } from '../../pages/listallpatient/listallpatient.component';
import { ListalldocComponent } from '../../pages/listalldoc/listalldoc.component';
import { ListallresComponent } from '../../pages/listallres/listallres.component';
import { ListallinternComponent } from '../../pages/listallintern/listallintern.component';
import { DoctorComponent } from '../../pages/doctor/doctor.component';
import { AjoutpatientComponent } from '../../pages/ajoutpatient/ajoutpatient.component';
import {ManageprofilComponent} from '../../pages/manageprofil/manageprofil.component';
import {UpdatepatientComponent} from '../../pages/updatepatient/updatepatient.component';
import {AjoutresinterComponent} from '../../pages/ajoutresinter/ajoutresinter.component';
import {AjoutadminhopComponent} from '../../pages/ajoutadminhop/ajoutadminhop.component';
import {ListhopComponent} from '../../pages/listhop/listhop.component';
import {DocbyhopComponent} from '../../pages/docbyhop/docbyhop.component';
import {PatientbyhopComponent} from '../../pages/patientbyhop/patientbyhop.component';

export const AdminLayoutRoutes: Routes = [
    { path: 'dashboard',      component: DashboardComponent },
    { path: 'user-profile',   component: UserProfileComponent },
    { path: 'tables',         component: TablesComponent },
  { path: 'register',       component: RegisterComponent },
  { path: 'listepatient',       component: ListepatientComponent },
  { path: 'listenoncontacter',       component: ListenoncontacterComponent },
  { path: 'adddoc',       component: DoctorComponent },
  { path: 'addpatient',       component: AjoutpatientComponent },
  { path: 'profil',       component: ManageprofilComponent },
  { path: 'addsurvey',       component: AjoutsurveyComponent },
  { path: 'addchef',       component: AjoutchefserviceComponent },
  { path: 'fichepatient',       component: FichepatientComponent },
  { path: 'updatepatient',       component:    UpdatepatientComponent},
  { path: 'allpatient',       component:    ListallpatientComponent},
  { path: 'alldoc',       component:    ListalldocComponent},
  { path: 'allres',       component:    ListallresComponent},
  { path: 'allint',       component:    ListallinternComponent},
  { path: 'addinres',       component:    AjoutresinterComponent},
  { path: 'addadminhop',       component:    AjoutadminhopComponent},
  { path: 'listhop',       component:    ListhopComponent},
  { path: 'alldocbyhop',       component:    DocbyhopComponent},
  { path: 'allptbyhop',       component:    PatientbyhopComponent},
  { path: 'dssbadmin',       component:     DssbAdminComponent},

];
